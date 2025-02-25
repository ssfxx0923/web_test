# 开发指南与规范

## 核心原则

1. **代码修改限制**
   - 只能修改实现新需求相关的代码
   - 不得更改现有的动画结构
   - 不得更改现有的UI布局
   - 不得更改其他功能性代码

2. **代码审查流程**
   - 在修改代码前必须仔细阅读所有相关代码
   - 确保完全理解项目结构和现有功能
   - 评估修改对现有功能的潜在影响

3. **代码提交流程**
   - 所有代码更改必须推送到指定仓库：
   - Repository: https://github.com/ssfxx0923/web_cursor.git

## 项目结构概述

1. **前端结构**
   - 聊天界面
   - 游戏界面（贪吃蛇和扫雷）
   - 背景轮播
   - 响应式设计

2. **后端结构**
   - API处理
   - 多模型支持（LinkAI、Claude、CEOK）
   - 错误处理

3. **核心功能**
   - 实时聊天
   - 游戏系统
   - 背景切换
   - 社交媒体链接

## 开发注意事项

1. **代码风格**
   - 保持现有的代码风格和格式
   - 遵循项目既定的命名规范
   - 保持代码注释的一致性

2. **性能考虑**
   - 保持现有的性能优化措施
   - ���引入新的性能负担
   - 维护现有的动画流畅度

3. **兼容性**
   - 确保修改后的代码与现有浏览器兼容性保持一致
   - 不引入需要额外polyfill的新特性

## 文档维护

1. **更新记录**
   - 记录所有代码修改
   - 说明修改原因和影响范围
   - 标注修改日期和版本

2. **测试要求**
   - 确保修改不影响现有功能
   - 新功能必须经过充分测试
   - 记录测试结果和可能的问题

## 版本控制

1. **分支管理**
   - 主分支：main
   - 功能分支：feature/*
   - 修复分支：bugfix/*

2. **提交规范**
   - 清晰的提交信息
   - 相关的问题引用
   - 必要的代码审查

## 安全考虑

1. **数据安全**
   - 保护用户数据
   - 安全的API调用
   - 适当的错误处理

2. **代码安全**
   - 避免引入安全漏洞
   - 保护API密钥
   - 适当的访问控制

## 维护责任

1. **代码质量**
   - 确保代码可维护性
   - 避免引入技术债务
   - 保持代码整洁

2. **问题跟踪**
   - 记录已知问题
   - 跟踪修复进度
   - 更新解决方案

## 更新日志

| 日期 | 版本 | 修改内容 | 修改人 |
|------|------|----------|--------|
| 2024-03-21 | 1.0 | 创建开发指南文档 | Claude | 