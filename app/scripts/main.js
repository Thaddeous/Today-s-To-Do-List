// Model
User = Backbone.Model.extend({
 
  initialize: function() {
    this.on('change', function(){
      // here is the future
    })
  },
 
  defaults: {
    human: true
  },
 
  idAttribute: '_id'
});
 

UserCollection = Backbone.Collection.extend({
 
  model: User,
 
  url: 'http://tiny-pizza-server.herokuapp.com/collections/test-users',
})


UserView = Backbone.View.extend({
 
  template: _.template($('.user-list-item').text()),
  editTemplate: _.template($('.user-list-edit-item').text()),
 
  events: {
    'click .edit-button'    : 'showEdit',
    'click .save-button'    : 'saveChanges',
    'click .delete-button'  : 'destroy',
    'keydown input'         : 'checkForChanges'
 
  },
 
  initialize: function(){
 
    this.listenTo(this.model, 'change', this.render);
 
 
    $('.container').prepend(this.el);
    this.render();
  },
 
  render: function(){
    var renderedTemplate = this.template(this.model.attributes)
    this.$el.html(renderedTemplate);
  },
 
  showEdit: function(){
    var renderedTemplate = this.editTemplate(this.model.attributes)
    this.$el.html(renderedTemplate);
  },
 
  saveChanges: function(){
    var nameVal = this.$el.find('.name input').val();
    this.model.set('name', nameVal);
    this.model.save()
  },
 
  destroy: function(){
    this.model.destroy();
    this.remove();
  },
 
  checkForChanges: function(){
    if (this.model.get('name') !== this.$el.find('.name input').val()){
      this.$el.find('.name input').addClass('changed')
    } else {
      this.$el.find('.name input').removeClass('changed')
    }
  }
})
 
 
// create instances
var coolUsers = new UserCollection();
 
coolUsers.fetch().done(function(){
  coolUsers.each(function(user){
    new UserView({model: user});
  })
});