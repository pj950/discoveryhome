# 🛠 Discovery Homes - 开发操作指南

## 📋 项目当前架构

### 技术栈
- **前端**: React 19 + TypeScript
- **路由**: React Router DOM
- **样式**: Tailwind CSS
- **图表**: Recharts
- **构建**: Vite
- **部署**: Vercel

### 项目结构
```
discoveryhome/
├── components/          # 可复用组件
│   ├── Header.tsx      # 头部导航
│   ├── Footer.tsx      # 底部信息
│   ├── PropertyCard.tsx # 房源卡片（包含详情弹窗）
│   ├── StatsChart.tsx  # 统计图表
│   └── Spinner.tsx     # 加载动画
├── pages/              # 页面组件
│   ├── HomePage.tsx    # 首页
│   ├── AdminPage.tsx   # 后台主页（包含导航）
│   ├── DashboardPage.tsx # 数据仪表盘
│   ├── MessagesPage.tsx  # 消息管理
│   ├── ReportsPage.tsx   # 数据报告
│   └── SettingsPage.tsx  # 系统设置
├── services/           # 服务层
│   └── geminiService.ts # AI服务（预留）
├── App.tsx            # 主应用
├── types.ts           # 类型定义
├── constants.ts       # 常量和模拟数据
├── index.css          # 全局样式
└── 配置文件...
```

## 🔧 具体操作指南

### 1. 添加新页面

#### 步骤 1: 创建页面组件
```typescript
// pages/NewPage.tsx
import React from 'react';

interface NewPageProps {
  // 定义props类型
}

const NewPage: React.FC<NewPageProps> = (props) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">新页面</h1>
      {/* 页面内容 */}
    </div>
  );
};

export default NewPage;
```

#### 步骤 2: 添加路由
```typescript
// App.tsx
import NewPage from './pages/NewPage';

// 在Routes中添加
<Route path="/new-page" element={<NewPage />} />
```

#### 步骤 3: 添加导航
```typescript
// pages/AdminPage.tsx - 在Sidebar组件中添加
<button 
  onClick={() => onPageChange('new-page')}
  className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
    currentPage === 'new-page' ? 'bg-admin-green-light text-admin-green' : 'text-gray-300 hover:bg-gray-700'
  }`}
>
  <NewPageIcon /> New Page
</button>
```

### 2. 添加新的数据类型

#### 步骤 1: 定义类型
```typescript
// types.ts
export interface NewDataType {
  id: number;
  name: string;
  createdAt: string;
  // 其他字段...
}
```

#### 步骤 2: 添加模拟数据
```typescript
// constants.ts
export const MOCK_NEW_DATA: NewDataType[] = [
  {
    id: 1,
    name: '示例数据',
    createdAt: '2024-01-01',
  },
  // 更多数据...
];
```

### 3. 创建新的图表组件

#### 步骤 1: 创建图表组件
```typescript
// components/NewChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface NewChartProps {
  data: any[];
  title: string;
}

const NewChart: React.FC<NewChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#48BB78" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewChart;
```

#### 步骤 2: 在页面中使用
```typescript
// pages/DashboardPage.tsx
import NewChart from '../components/NewChart';

// 在组件中使用
<NewChart data={chartData} title="新图表标题" />
```

### 4. 添加新的表单组件

#### 步骤 1: 创建表单组件
```typescript
// components/NewForm.tsx
import React, { useState } from 'react';

interface NewFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const NewForm: React.FC<NewFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // 其他字段...
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          名称
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
          required
        />
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-admin-green text-white rounded-lg hover:bg-green-600"
        >
          提交
        </button>
      </div>
    </form>
  );
};

export default NewForm;
```

### 5. 添加新的API服务

#### 步骤 1: 创建服务文件
```typescript
// services/newService.ts
const API_BASE_URL = 'https://api.example.com';

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export const newService = {
  // 获取数据
  async getData(): Promise<ApiResponse<any[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/data`);
      return await response.json();
    } catch (error) {
      throw new Error('获取数据失败');
    }
  },

  // 创建数据
  async createData(data: any): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('创建数据失败');
    }
  },

  // 更新数据
  async updateData(id: number, data: any): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/data/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('更新数据失败');
    }
  },

  // 删除数据
  async deleteData(id: number): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/data/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      throw new Error('删除数据失败');
    }
  },
};
```

#### 步骤 2: 在组件中使用
```typescript
// pages/SomePage.tsx
import { useEffect, useState } from 'react';
import { newService } from '../services/newService';

const SomePage: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newService.getData();
        if (response.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>加载中...</div>;

  return (
    <div>
      {/* 渲染数据 */}
    </div>
  );
};
```

### 6. 添加状态管理

#### 步骤 1: 创建Context
```typescript
// contexts/AppContext.tsx
import React, { createContext, useContext, useReducer } from 'react';

interface AppState {
  user: User | null;
  properties: Property[];
  loading: boolean;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_PROPERTIES'; payload: Property[] }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  user: null,
  properties: [],
  loading: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_PROPERTIES':
      return { ...state, properties: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
```

#### 步骤 2: 在App中使用
```typescript
// App.tsx
import { AppProvider } from './contexts/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        {/* 其他组件 */}
      </HashRouter>
    </AppProvider>
  );
};
```

### 7. 添加自定义Hook

#### 步骤 1: 创建Hook
```typescript
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
```

#### 步骤 2: 在组件中使用
```typescript
// components/SomeComponent.tsx
import { useLocalStorage } from '../hooks/useLocalStorage';

const SomeComponent: React.FC = () => {
  const [settings, setSettings] = useLocalStorage('userSettings', {
    theme: 'light',
    language: 'zh-CN',
  });

  return (
    <div>
      <button onClick={() => setSettings({ ...settings, theme: 'dark' })}>
        切换主题
      </button>
    </div>
  );
};
```

### 8. 添加错误边界

#### 步骤 1: 创建错误边界组件
```typescript
// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              哎呀，出错了！
            </h1>
            <p className="text-gray-600 mb-4">
              页面遇到了一些问题，请刷新页面重试。
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-admin-green text-white rounded-lg hover:bg-green-600"
            >
              刷新页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

#### 步骤 2: 在App中使用
```typescript
// App.tsx
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <HashRouter>
          {/* 其他组件 */}
        </HashRouter>
      </AppProvider>
    </ErrorBoundary>
  );
};
```

### 9. 添加加载状态组件

#### 步骤 1: 创建加载组件
```typescript
// components/Loading.tsx
import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 'md', text }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-admin-green rounded-full animate-spin`}
      />
      {text && (
        <p className="mt-4 text-gray-600 text-sm">{text}</p>
      )}
    </div>
  );
};

export default Loading;
```

#### 步骤 2: 在页面中使用
```typescript
// pages/SomePage.tsx
import Loading from '../components/Loading';

const SomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading text="正在加载数据..." />;
  }

  return (
    <div>
      {/* 页面内容 */}
    </div>
  );
};
```

## 🚀 开发流程

### 1. 开发新功能
```bash
# 1. 创建新分支
git checkout -b feature/new-feature

# 2. 开发功能
# 3. 测试功能
npm run dev

# 4. 构建测试
npm run build

# 5. 提交代码
git add .
git commit -m "feat: add new feature"

# 6. 推送分支
git push origin feature/new-feature

# 7. 创建Pull Request
```

### 2. 修复Bug
```bash
# 1. 创建修复分支
git checkout -b fix/bug-description

# 2. 修复Bug
# 3. 测试修复
# 4. 提交代码
git add .
git commit -m "fix: resolve bug description"

# 5. 推送并合并
git push origin fix/bug-description
```

### 3. 代码规范
```typescript
// 使用一致的命名规范
const ComponentName = () => {
  const [stateVariable, setStateVariable] = useState();
  
  const handleSomething = () => {
    // 处理逻辑
  };
  
  return <div>内容</div>;
};

// 使用TypeScript类型
interface Props {
  title: string;
  count?: number;
}

// 使用常量
const CONSTANTS = {
  MAX_ITEMS: 100,
  DEFAULT_PAGE_SIZE: 20,
};
```

## 📝 提交规范

```bash
# 功能: feat: 添加新功能
git commit -m "feat: add user authentication"

# 修复: fix: 修复Bug
git commit -m "fix: resolve login issue"

# 文档: docs: 更新文档
git commit -m "docs: update installation guide"

# 样式: style: 代码格式化
git commit -m "style: format code with prettier"

# 重构: refactor: 重构代码
git commit -m "refactor: optimize component structure"

# 测试: test: 添加测试
git commit -m "test: add unit tests for auth service"

# 构建: build: 构建相关
git commit -m "build: update dependencies"
```

## 🎯 最佳实践

1. **组件设计**: 保持组件单一职责，可复用性强
2. **状态管理**: 合理使用local state和global state
3. **性能优化**: 使用React.memo、useMemo、useCallback
4. **错误处理**: 添加错误边界和用户友好的错误提示
5. **代码分割**: 使用React.lazy进行代码分割
6. **类型安全**: 充分利用TypeScript的类型检查
7. **测试**: 为关键功能添加单元测试

这个开发指南涵盖了项目开发的各个方面，可以帮助您快速上手和扩展功能。