Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :markers do
        member do
          put 'updateMarker'
        end
        collection do
          post 'createNewMarker'
        end
      end
    end
  end
end
