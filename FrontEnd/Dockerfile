# Step 1: Dùng Node.js để cài đặt thư viện và build mã nguồn React Vite
FROM node:20-alpine AS build
WORKDIR /app

# Copy các file cấu hình package trước để tối ưu hóa bộ nhớ cache của Docker
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn còn lại của frontend và chạy lệnh build
COPY . .
RUN npm run build

# Step 2: Dùng Nginx gọn nhẹ làm web server deploy production
FROM nginx:stable-alpine

# Copy các file tĩnh sau khi build (thư mục dist của Vite) vào thư mục mặc định của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Ghi đè file cấu hình nginx.conf của dự án vào Nginx container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở cổng 80 công khai cho ứng dụng web
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]