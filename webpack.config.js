import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry:"./src/index.js",
    output :{
        path:path.join(__dirname,"dist"),
        filename:'bundle.js'
    },
    plugins :[
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:['@babel/preset-env','@babel/preset-react']
                        }
                        }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx'], // Add more extensions if needed
        alias: {
            'react-bootstrap/Button': 'react-bootstrap/Button.js'
        }
    }
}
