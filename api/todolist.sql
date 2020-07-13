/*
 Navicat Premium Data Transfer

 Source Server         : 3307
 Source Server Type    : MySQL
 Source Server Version : 50714
 Source Host           : localhost:3307
 Source Schema         : todolist

 Target Server Type    : MySQL
 Target Server Version : 50714
 File Encoding         : 65001

 Date: 13/07/2020 15:45:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for list
-- ----------------------------
DROP TABLE IF EXISTS `list`;
CREATE TABLE `list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'list的id',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `content` char(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT 'list内容',
  `status` tinyint(1) NULL DEFAULT NULL COMMENT 'list的状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 11 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of list
-- ----------------------------
INSERT INTO `list` VALUES (8, 1, 'test212', 0);
INSERT INTO `list` VALUES (6, 1, 'test', 0);
INSERT INTO `list` VALUES (7, 1, 'test213', 0);
INSERT INTO `list` VALUES (9, 1, 'test21221', 0);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL COMMENT '用户id',
  `user_name` char(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '用户名字',
  `password` char(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '用户密码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'kavii', '123');

SET FOREIGN_KEY_CHECKS = 1;
