# frozen_string_literal: true

Rails.application.routes.draw do
  get 'oops' => 'fake_error#new', as: :oops
  get 'noops' => 'fake_error#robots', as: :noops
  get 'skoops' => 'fake_error#slack', as: :skoops
end
