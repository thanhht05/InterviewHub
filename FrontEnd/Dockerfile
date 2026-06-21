# Step 1: Dùng Node.js để cài đặt thư viện và build mã nguồn React Vite
FROM node:20-alpine AS build
WORKDIR /app

# SỬA Ở ĐÂY: Trỏ vào đúng thư mục my-react-app để lấy file cấu hình
COPY my-react-app/package*.json ./
RUN npm install

# SỬA Ở ĐÂY: Copy toàn bộ code từ my-react-app vào trong container
COPY my-react-app/ .
RUN npm run build

# Step 2: Dùng Nginx gọn nhẹ làm web server deploy production (Giữ nguyên như cũ)
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]