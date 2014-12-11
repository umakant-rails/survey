class HomesController < ApplicationController
  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.html
      format.json { render json: {:current_user => current_user}}
    end
  end

end
