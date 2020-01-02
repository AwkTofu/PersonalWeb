class CharactersController < ApplicationController

	def index
		@characters = Character.all 
		render json: @characters
	end

	def create
		
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
