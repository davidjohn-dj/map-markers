import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Spin, Card, Icon } from 'antd';
import AddMarkerForm from './addMarker';
import Map from "./Map";
import { getMarkerList, updateMarkerData, deleteMarker } from '../redux/actions/marker';

const { Meta } = Card;

const style = {
    width: '100%',
    height: '100%'
}

const colStyle = {
    height: '100vh'
}

let points = [];

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.editMarkerItem = this.editMarkerItem.bind(this);
        this.deleteMarkerItem = this.deleteMarkerItem.bind(this);
        this.renderMarked = this.renderMarked.bind(this);
    }

    getMarkers() {
        this.props.getMarkerList();
    }

    componentDidMount() {
        this.intervalId = setInterval(this.getMarkers.bind(this), 1000);
        this.props.marker.markerList.map((item, index) =>
            points.push({ id: item.id, name: item.title, title: item.title, lat: item.latitude, lng: item.longitude })
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.marker.markerList !== nextProps.marker.markerList) {
            // nextProps.getMarkerList();
            points = [];
            nextProps.marker.markerList.map((item, index) =>
                points.push({ id: item.id, name: item.title, title: item.title, lat: item.latitude, lng: item.longitude })
            );
        }
    }

    editMarkerItem(id, title) {
        this.props.updateMarkerData({ isEditMarker: true, editData: { id: id, title: title } });
    }

    deleteMarkerItem(id) {
        this.props.deleteMarker(id);
        this.props.getMarkerList();
        this.renderMarked();
    }

    renderMarked() {
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 14 },
        };
        return (this.props.marker.markerList.length >= 1 ?
            this.props.marker.markerList.map((item, index) => (
                <Col key={`${index}`} lg={12} xl={12}>
                    <Card
                        title={item.title}
                        type="inner"
                        style={{ margin: "5px" }}
                        actions={[<Icon type="edit" onClick={(e) => this.editMarkerItem(item.id, item.title)} />, <Icon type="delete" onClick={(e) => this.deleteMarkerItem(item.id)} />]}
                    >
                        <Meta
                            description={<Form labelAlign={'left'} {...formItemLayout}>
                                <Form.Item className="map-marker"
                                    label="Latitude"
                                >
                                    <span className="ant-form-text">{item.latitude}</span>
                                </Form.Item>
                                <Form.Item className="map-marker"
                                    label="Longitude"
                                >
                                    <span className="ant-form-text">{item.longitude}</span>
                                </Form.Item>
                            </Form>}
                        />
                    </Card>
                </Col>
            ))
            : <h3>No Locations Added</h3>
        )
    }

    render() {
        return (
            <Row type="flex" justify="space-between">
                <Col xs={24} sm={24} md={15} lg={15} xl={15} style={colStyle}>
                    <Map
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBq5bd9aDDbWnOr8hEfyXTeTzHdIO82CL0"
                        loadingElement={<Spin size="large" />}
                        containerElement={<div style={colStyle} />}
                        mapElement={<div style={style} />}
                        center={{ lat: 51.1726158, lng: 10.2329033 }}
                        zoom={6}
                        places={points}
                    />
                </Col>
                <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                    <Card
                        title={<h2 style={{ margin: 0 }}>Locations</h2>}
                        extra={<AddMarkerForm />}
                    >
                        <Row type="flex" justify="space-between">
                            {this.renderMarked() ? this.renderMarked() : <Spin size="large" />}
                        </Row>
                    </Card>
                </Col>

            </Row>
        );
    }
}

const actionCreators = {
    getMarkerList,
    updateMarkerData,
    deleteMarker
};

const mapStateToProps = (state) => {
    return {
        marker: state.marker
    };
};

export default connect(mapStateToProps, actionCreators)(MapContainer);
