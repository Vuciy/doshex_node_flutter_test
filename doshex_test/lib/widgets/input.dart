import 'package:flutter/material.dart';

import '../constant.dart';

// ignore: must_be_immutable
class InputWidget extends StatelessWidget {
  TextEditingController inputController;
  String hintText;
  String errorText;
  bool obscure;
  Widget icon;

  InputWidget(
      {this.inputController,
      this.hintText,
      this.errorText,
      this.obscure,
      this.icon});

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: inputController,
/*         onChanged: (value) {
          inputValue = value;
        }, */
      validator: (value) {
        if (value.isEmpty) {
          return errorText;
        }
        return null;
      },
      obscureText: obscure,
      decoration: InputDecoration(
          icon: icon,
          hintText: hintText,
          enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: BorderSide(color: primaryColor)),
          focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: BorderSide(color: primaryColor)),
          errorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: BorderSide(color: dangerColor)),
          focusedErrorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: BorderSide(color: dangerColor))),
    );
  }
}
