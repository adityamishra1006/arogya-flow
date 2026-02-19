FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

# ⭐ FIX PERMISSION ISSUE
RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

CMD ["java", "-jar", "target/arogya-flow-backend-0.0.1-SNAPSHOT.jar"]
