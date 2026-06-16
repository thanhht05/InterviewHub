# Bước 1: Dùng image JDK 21 bản gọn nhẹ (Alpine) để tiết kiệm RAM cho server
FROM eclipse-temurin:21-jdk-alpine

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Copy file .jar đã build từ máy vào container
COPY target/*.jar app.jar

# Chạy ứng dụng Spring Boot kèm tham số bóp RAM cho Java Virtual Machine (JVM)
# Giới hạn Heap Size tối đa là 300MB để không làm treo server 1GB RAM
ENTRYPOINT ["java", "-Xmx300m", "-jar", "app.jar"]