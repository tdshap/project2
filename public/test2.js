// ##########################################################
// 3 collections with instantiations


// Family
var FamilyCollection1 = Backbone.Collection.extend({
	url: "/categories/8",
	model: ContactsModel
})
var familyCollection1 = new FamilyCollection();

// Work
var WorkCollection1 = Backbone.Collection.extend({
	url: "/categories/9",
	model: ContactsModel
})
var workCollection1 = new WorkCollection();

// Friends
var FriendsCollection1 = Backbone.Collection.extend({
	url: "/categories/7",
	model: ContactsModel
})
var friendsCollection1 = new FriendsCollection();

var friendsCollection1


friendsCollectionListView.fetch({
	success: function(){
		var template = _.template($("#friends-list-template").html() );


	}
}


}