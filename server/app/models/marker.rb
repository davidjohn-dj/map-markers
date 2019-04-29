class Marker < ApplicationRecord
    validates :title, presence: true
    validates :latitude, presence: true
    validates :longitude, presence: true
end
