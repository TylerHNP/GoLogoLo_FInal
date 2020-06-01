var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLFloat = require('graphql').GraphQLFloat;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');

var textType = new GraphQLObjectType({
    name: 'text',
    fields: function () {
        return {
            text: {
                type: GraphQLString
            },
            left: {
                type: GraphQLInt
            },
            top: {
                type: GraphQLInt
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderRadius: {
                type: GraphQLInt
            },
            borderWidth: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            }
        }
    }
});


var imageType = new GraphQLObjectType({
    name: 'image',
    fields: function () {
        return {
            src: {
                type: GraphQLString
            },
            left: {
                type: GraphQLInt
            },
            top: {
                type: GraphQLInt
            },
            height: {
                type: GraphQLInt
            },
            width: {
                type: GraphQLInt
            }
        }
    }
});

var userType = new GraphQLObjectType({
    name: 'user',
    fields: function () {
        return {
            email: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            },
            logos: {
                type: new GraphQLList(String)
            }
        }
    }
});


var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            texts: {
                type: new GraphQLList(textType)
            },
            images: {
                type: new GraphQLList(imageType)
            },
            lastUpdate: {
                type: GraphQLDate
            }

        }
    }
});

var textInputType = new GraphQLInputObjectType({
    name: 'textInput',
    fields: () => ({
        text: {
            type: GraphQLString
        },
        left: {
            type: GraphQLFloat
        },
        top: {
            type: GraphQLFloat
        },
        color: {
            type: GraphQLString
        },
        fontSize: {
            type: GraphQLInt
        },
        backgroundColor: {
            type: GraphQLString
        },
        borderColor: {
            type: GraphQLString
        },
        borderRadius: {
            type: GraphQLInt
        },
        borderWidth: {
            type: GraphQLInt
        },
        padding: {
            type: GraphQLInt
        },
        margin: {
            type: GraphQLInt
        },
        lastUpdate: {
            type: GraphQLDate
        }

    })
});


var imageInputType = new GraphQLInputObjectType({
    name: 'imageInput',
    fields: () => ({
        src: {
            type: GraphQLString
        },
        left: {
            type: GraphQLInt
        },
        top: {
            type: GraphQLInt
        },
        height: {
            type: GraphQLInt
        },
        width: {
            type: GraphQLInt
        }

    })
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    texts: {
                        type: new GraphQLNonNull(GraphQLList(textInputType))
                    },
                    images: {
                        type: new GraphQLNonNull(GraphQLList(imageInputType))
                    }
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    texts: {
                        type: new GraphQLNonNull(GraphQLList(textInputType))
                    },
                    images: {
                        type: new GraphQLNonNull(GraphQLList(imageInputType))
                    }
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id, {
                        texts: params.texts, images: params.images, lastUpdate: new Date()
                    }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec()
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
            // removeLogo: {
            //     type: logoType,
            //     args: {
            //         id: {
            //             type: new GraphQLNonNull(GraphQLList(GraphQLString))
            //         }
            //     },
            //     resolve(root, params) {
            //         var i;
            //         var remLogo;
            //         for (i = 0; i < params.id.length; i++) {
            //             remLogo = LogoModel.findByIdAndRemove(params.id[i]).exec()
            //             console.log(remLogo);
            //         }
            //         // const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
            //         if (!remLogo) {
            //             throw new Error('Error')
            //         }
            //         return remLogo;
            //     }
            // }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });