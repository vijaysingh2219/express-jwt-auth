# Express JWT Authentication API Documentation

## Introduction

Welcome to the Express JWT Authentication API documentation. This API allows users to register, log in, and perform authenticated actions using JSON Web Tokens (JWTs).

## Table of Contents

- [Express JWT Authentication API Documentation](#express-jwt-authentication-api-documentation)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [1. Getting Started](#1-getting-started)
  - [2. Authentication](#2-authentication)
  - [3. Endpoints](#3-endpoints)
  - [4. Request and Response Format](#4-request-and-response-format)
    - [Request Format](#request-format)
    - [Response Format](#response-format)
  - [5. Parameters](#5-parameters)
    - [User Registration (POST /register)](#user-registration-post-register)
    - [User Login (POST /auth)](#user-login-post-auth)
    - [Refresh Token (GET /refresh)](#refresh-token-get-refresh)
    - [Logout (POST /logout)](#logout-post-logout)
    - [Authenticated (GET /authenticated)](#authenticated-get-authenticated)
  - [6. Rate Limiting](#6-rate-limiting)

## 1. Getting Started

Follow the installation steps from the [README](/README.md), and you'll be ready to use the API. Refer to the [Authentication](#2-authentication) section for details.

## 2. Authentication

- The API utilizes JSON Web Tokens (JWTs) for authentication. Upon successful login, the API provides an access token as JSON and includes a cookie with the refresh token in the response.
- For authenticated requests, include the obtained access token in the Authorization header of the request using the format `Bearer <JWT_ACCESS_TOKEN>`.

## 3. Endpoints

- **POST /register**: Register a new user.
- **POST /auth**: Log in and obtain JWTs.
- **GET /refresh**: Obtain a new access token using a refresh token.
- **POST /logout**: Log out and invalidate the refresh token.
- **GET /authenticated**: An example authenticated route.

## 4. Request and Response Format

### Request Format

- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer <JWT_ACCESS_TOKEN>` (for authenticated requests)

### Response Format

- JSON format with appropriate status codes.

## 5. Parameters

### User Registration (POST /register)

- `username` (string): User's username.
- `password` (string): User's password.

### User Login (POST /auth)

- `username` (string): User's username.
- `password` (string): User's password.

### Refresh Token (GET /refresh)

- `Cookie` : The refresh token is expected to be included in the request cookie.

### Logout (POST /logout)

- `Cookie` : The refresh token is expected to be included in the request cookie.

### Authenticated (GET /authenticated)

- `Authorization: Bearer <JWT_ACCESS_TOKEN>`

## 6. Rate Limiting

The API does not impose rate limiting.
