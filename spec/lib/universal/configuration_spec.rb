# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Universal::Configuration do
  describe '.class_name_user' do
    it { expect(described_class.class_name_user).to eq('Padlock::User') }
  end
end
