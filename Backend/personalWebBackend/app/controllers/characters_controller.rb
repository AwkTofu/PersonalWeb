class CharactersController < ApplicationController

	def index
		@characters = Character.all 
		render json: @characters
	end

	def create
		whitelist = params.permit(:name, :level, :exp)
		@character = Character.create(whitelist)
		if @character.valid?
			render json: @character
		else
			render json: {errors: @character.errors.full_messages}
		end
	end

	def show
		@character = Character.find(params[:id])
		render json: @character
	end

	def destroy
		@character = Character.find(params[:id])
		@character.delete
	end

end
