const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js", // Điểm vào chính
  output: {
    path: __dirname + "/build",
    filename: "index.js", // Đặt tên file bundle
    clean: true, // Xóa build cũ trước khi build mới
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/, // Thêm xử lý file CSS
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Sử dụng template
      filename: "index.html"
    }),
    new webpack.ProvidePlugin({
      React: "react"
    })
  ],
  resolve: {
    extensions: [".js", ".css"],
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  }
};
