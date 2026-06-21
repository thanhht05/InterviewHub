# Step 1: Build ứng dụng Spring Boot với Maven sử dụng Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy file pom.xml và toàn bộ source code vào container
COPY pom.xml .
COPY src ./src

# Tiến hành build file JAR và bỏ qua chạy thử nghiệm (test) để tiết kiệm thời gian
RUN mvn clean package -DskipTests

# Step 2: Tạo runtime container gọn nhẹ chỉ cần JRE 21
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy file JAR đã build từ Step 1 sang
COPY --from=build /app/target/*.jar app.jar

# Mở cổng 8080 cho Backend
EXPOSE 8080

# Lệnh khởi chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]