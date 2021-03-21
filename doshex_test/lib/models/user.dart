import 'dart:convert';

import 'package:doshex_test/network_utils/api.dart';
import 'package:doshex_test/widgets/toast.dart';
import 'package:shared_preferences/shared_preferences.dart';

User userFromJson(String str) => User.fromJson(json.decode(str));

String userToJson(User data) => json.encode(data.toJson());

class User {
  User({
    this.success,
    this.user,
    this.token,
  });

  bool success;
  UserClass user;
  String token;

  factory User.fromJson(Map<String, dynamic> json) => User(
        success: json["success"],
        user: UserClass.fromJson(json["user"]),
        token: json["token"],
      );

  Map<String, dynamic> toJson() => {
        "success": success,
        "user": user.toJson(),
        "token": token,
      };

  Future<bool> login(Map data) async {
    try {
      final res = await Network().postData(data, "/user/login");
      final body = json.decode(res.body);
      if (res.statusCode == 200) {
        SharedPreferences localStorage = await SharedPreferences.getInstance();
        localStorage.setString('token', json.encode(body["token"]));
        return true;
      } else {
        if (body["errors"] != null) {
          toast(body["errors"][0]["msg"] + " for ${body["errors"][0]["param"]}",
              "error");
        } else {
          toast(body["message"], "error");
        }
        return false;
      }
    } catch (e) {
      toast("Something went wrong", "error");
      return false;
    }
  }

  Future<bool> signUp(Map data) async {
    try {
      final res = await Network().postData(data, "/user/sign_up");
      final body = json.decode(res.body);
      if (res.statusCode == 200) {
        SharedPreferences localStorage = await SharedPreferences.getInstance();
        localStorage.setString('token', json.encode(body["token"]));
        return true;
      } else {
        if (body["errors"] != null) {
          toast(body["errors"][0]["msg"] + " for ${body["errors"][0]["param"]}",
              "error");
        } else {
          toast(body["message"], "error");
        }
        return false;
      }
    } catch (e) {
      toast("Something went wrong", "error");
      return false;
    }
  }

  Future<bool> getUser() async {
    try {
      final res = await Network().getData("/user/get_user");
      final body = json.decode(res.body);
      if (res.statusCode == 200) {
        SharedPreferences localStorage = await SharedPreferences.getInstance();
        localStorage.setString('token', json.encode(body["token"]));
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}

class UserClass {
  UserClass({
    this.id,
    this.firstName,
    this.lastName,
    this.email,
    this.createdAt,
    this.updatedAt,
  });

  String id;
  String firstName;
  String lastName;
  String email;
  DateTime createdAt;
  DateTime updatedAt;

  factory UserClass.fromJson(Map<String, dynamic> json) => UserClass(
        id: json["_id"],
        firstName: json["firstName"],
        lastName: json["lastName"],
        email: json["email"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
      };
}
