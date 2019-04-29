require 'json'
require 'net/http'

COUNTRY = "Germany"
COUNTRY_CODE = "DE"
LANGUAGE= "en"
BASE_URL="https://maps.googleapis.com/maps/api/geocode/json"
API_KEY = "AIzaSyBq5bd9aDDbWnOr8hEfyXTeTzHdIO82CL0"

module Api
    module V1
      class MarkersController < ApplicationController
        skip_before_action :verify_authenticity_token
        def initialize
            @title = ""
            @latitude = 0
            @longitude = 0
        end

        # Main processing
        def  geocode_process title
            begin
              # Get latitude and longitude from address
              url = "#{BASE_URL}?address=#{URI.encode(title)}%20#{COUNTRY}&sensor=false&language=#{LANGUAGE}&key=#{API_KEY}"
              res = Net::HTTP.get_response(URI.parse(url))
              status = JSON.parse(res.body)
              if status['status'] == "OK"
                if status["results"][0]["address_components"].find {|k| k["types"] == ["country", "political"]}["short_name"] == COUNTRY_CODE
                  @title = status["results"][0]["address_components"][0]["long_name"]
                  @latitude  = status['results'][0]['geometry']['location']['lat']
                  @longitude  = status['results'][0]['geometry']['location']['lng']
                  # puts "Address : #{@title}"
                  # puts  " latitude degrees: #{@latitude} , #{@longitude} "
                  return @title, @longitude, @latitude, nil
                else
                  return nil, nil, nil, "Please add a proper location from #{COUNTRY}. Also all other locations from different countries are not allowed."
                end
              else
                puts "STATUS : #{status['status']}"
                return nil, nil, nil, "Wrong Search"
              end
            rescue => e
              msg = "[EXCEPTION][" + self.class.name + ".geocode_process] " + e.to_s
              STDERR.puts msg
              return nil, nil, nil, "syaytemError"+msg
            end
        end
        
        def index
          markers = Marker.order('updated_at DESC');
          # markers.as_json(only: [:id, :title])
          render json: {status: 'SUCCESS', message:'Loaded markers', data:markers},status: :ok
        end
  
        def show
          marker = Marker.find(params[:id])
          render json: {status: 'SUCCESS', message:'Loaded marker', data:marker},status: :ok
        end
  
        def destroy
          marker = Marker.find_by_id(params[:id])
          if marker
            marker.destroy
            render json: {status: 'SUCCESS', message:'Marker is Deleted', marker: marker.as_json},status: :ok
          else
            render json: {status: 'ERROR', message:'Marker is not present'},status: :ok
          end
          rescue => e
            msg = "[EXCEPTION][" + self.class.name + ".geocode_process] " + e.to_s
            STDERR.puts msg
            render json: {status: 'ERROR', message: msg}
        end

        def createNewMarker
          title, longitude,latitude = geocode_process params[:title]
          if longitude && latitude && title
            marker = Marker.new(title: title, latitude: latitude, longitude: longitude)
            marker.save!
            render json: {status: 'SUCCESS', message:'Marker is created Successfully', marker: marker.as_json}
          else
            render json: {status: 'ERROR', message:"Please add a proper location from #{COUNTRY}. Also all other locations from different countries are not allowed."}
          end
        rescue => e
          msg = "[EXCEPTION][" + self.class.name + ".geocode_process] " + e.to_s
          STDERR.puts msg
          render json: {status: 'ERROR', message: msg}
        end

        def updateMarker
          title, longitude,latitude , exceptionMessage = geocode_process params[:title]
          if longitude && latitude && title
            marker = Marker.find_by_id(params[:id])
            if marker
              marker.update_attributes(title: title, latitude: latitude, longitude: longitude)
              marker.save!
              render json: {status: 'SUCCESS', message:'Marker is updated Successfully', marker: marker.as_json}
            else
              render json: {status: 'ERROR', message:'Marker not found'}
            end
          else
            render json: {status: 'ERROR', message: exceptionMessage}
          end
        rescue => e
          msg = "[EXCEPTION][" + self.class.name + ".geocode_process] " + e.to_s
          STDERR.puts msg
          render json: {status: 'ERROR', message: msg}
        end
  
        private
  
        def marker_params
          params.permit(:title, :latitude, :longitude)
        end
      end
    end
  end