const localUrl = process.env.MONGO_LOCAL_URL;
const atlasUrl = process.env.MONGO_ATLAS_URL;
const config = {
	localUrl,
	atlasUrl,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
};
/* 
options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	}, */
module.exports.config = config;
