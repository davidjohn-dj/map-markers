import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Modal, notification } from 'antd';
import { getMarkerList, createMarker, updateMarker, updateMarkerData } from '../redux/actions/marker';

class MarkerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const { form } = this.props;
        if (this.props.marker.editData !== nextProps.marker.editData) {
            form.setFieldsValue({
                address: nextProps.marker.editData.title
            });
        }
    }

    componentDidMount() {
        this.props.getMarkerList();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (!err) {
                if (this.props.marker.editData.title !== value.address) {
                    if (this.props.marker.isEditMarker === true) {
                        this.props.updateMarker(this.props.marker.editData.id, value.address);
                        this.props.updateMarkerData({ isEditMarker: false });
                    } else {
                        this.props.createMarker(value.address);
                    }
                    this.handleOk();
                    this.props.form.resetFields();
                    this.props.getMarkerList();
                }
                else {
                    notification.open({
                        message: `NO CHANGE DETECTED`,
                        description: `Please enter a valid location to update ${this.props.marker.editData.title}`,
                        icon: <Icon type="info-circle" theme="twoTone" />
                    });
                }
            }
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        if (this.props.marker.isEditMarker === true) {
            this.props.updateMarkerData({ isEditMarker: false });
        } else {
            this.setState({
                visible: false,
            });
        }
        this.props.getMarkerList();
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.form.resetFields();
        if (this.props.marker.isEditMarker === true) {
            this.props.updateMarkerData({ isEditMarker: false });
        } else {
            this.setState({
                visible: false,
            });
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <span>
                <Button type="primary" onClick={this.showModal}><Icon type="plus-circle" /> Add Location</Button>
                <Modal
                    title={this.props.marker.isEditMarker === true ? `Edit ${this.props.marker.editData.title} Location` : `Add a new Location`}
                    visible={this.props.marker.isEditMarker === true ? true : this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item label={this.props.marker.isEditMarker === true ? `Edit your location` : `Enter your desired location`}>
                            {getFieldDecorator('address', {
                                rules: [{ required: true, message: 'Please enter your desired place name!' }],
                            })(
                                <Input prefix={<Icon type="picture" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Address" />
                            )}
                        </Form.Item>
                        <div className="ant-modal-footer">
                            <Button type="default" onClick={this.handleCancel} ant-click-animating-without-extra-node="false">Cancel</Button>
                            <Button htmlType="submit" type="primary">OK</Button>
                        </div>
                    </Form>
                </Modal>
            </span>
        );
    }
}

const AddMarkerForm = Form.create({ name: 'add_update_marker' })(MarkerForm);

const actionCreators = {
    getMarkerList,
    createMarker,
    updateMarker,
    updateMarkerData
};

const mapStateToProps = (state) => {
    return {
        marker: state.marker
    };
};

export default connect(mapStateToProps, actionCreators)(AddMarkerForm)
