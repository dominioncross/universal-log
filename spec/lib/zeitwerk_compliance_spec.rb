# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Rails' do
  context 'with Zeitwerk compliance' do
    it 'eager loads all files without errors' do
      expect { Rails.application.eager_load! }.not_to raise_error
    end
  end
end
