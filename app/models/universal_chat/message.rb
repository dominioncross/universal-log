module UniversalChat
  class Message
    include UniversalChat::Models::Message
    
        
        def to_json
          {
            id: self.id.to_s,
            author: self.author,
            message: self.message,
            status: self.status,
            channel: self.channel_name,
            created: self.created_at.strftime('%b %d, %Y - %-I:%M%p')
          }
        end
  end
end