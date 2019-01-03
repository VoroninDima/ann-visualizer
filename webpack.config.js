const path = require('path');
 
module.exports = {
	devtool: 'source-map',
        entry: [
       path.resolve(__dirname, 'app/app.js'),
       path.resolve(__dirname, 'app/style/main.css')
   ],
    output:{
        path: path.resolve(__dirname, './public'),     // путь к каталогу выходных файлов - папка public
        publicPath: '/public/',
        filename: "bundle.js"       // название создаваемого файла
    },
	resolve: {
	    alias: {
	        components: path.resolve(__dirname, 'app/components'),
	        settings: path.resolve(__dirname, 'app/components/settings/setting')
        }
    },
    module:{

        rules:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        "@babel/plugin-proposal-class-properties"
                    ]
                }
            },
			{
        		test: /\.css$/, 
        		use: ['style-loader', 'css-loader'] 
			}
        ]
    }
};