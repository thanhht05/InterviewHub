# =========================================================
# BƯỚC 1: Dùng Maven để tự động build code thành file .jar
# =========================================================
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy toàn bộ mã nguồn từ Git vào container build
COPY . .

# Chạy lệnh đóng gói (tự sinh ra thư mục target và file .jar bên trong container)
RUN mvn clean package -DskipTests


# =========================================================
# BƯỚC 2: Dùng JDK gọn nhẹ để chạy ứng dụng (Giữ nguyên cấu hình cũ của bạn)
# =========================================================
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# LẤY FILE .JAR TỪ BƯỚC 1 SANG BƯỚC 2
COPY --from=build /app/target/*.jar app.jar

# Giữ nguyên tham số bóp RAM 300MB của bạn để bảo vệ server 1GB RAM
ENTRYPOINT ["java", "-Xmx300m", "-jar", "app.jar"]