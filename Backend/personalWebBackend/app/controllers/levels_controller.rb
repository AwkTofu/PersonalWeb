class LevelsController < ApplicationController
	def index
		@levels = Level.all 
		render json: @levels
	end

	def show
		@level = Level.find(params[:id])
		render json: @level
	end
end
