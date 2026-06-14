// 公共JavaScript工具函数
class Utils {
  /**
   * 发起AJAX请求
   */
  static async request(url, options = {}) {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, mergedOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }

  /**
   * 显示消息提示
   */
  static showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 4px;
      color: white;
      background-color: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#2ecc71' : '#3498db'};
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 3000);
  }

  /**
   * 格式化日期
   */
  static formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function () {
  console.log('Page loaded successfully');

  // 绑定表单提交事件
  const forms = document.querySelectorAll('form[data-ajax]');
  forms.forEach(form => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      const action = form.getAttribute('action');
      const method = form.getAttribute('method') || 'POST';

      try {
        const response = await Utils.request(action, {
          method: method,
          body: JSON.stringify(data),
        });

        if (response.code === 0 || response.success) {
          Utils.showMessage(response.message || '操作成功', 'success');

          // 如果有回调函数，则执行
          const successCallback = form.getAttribute('data-success-callback');
          if (successCallback && typeof window[successCallback] === 'function') {
            window[successCallback](response);
          }
        } else {
          Utils.showMessage(response.message || '操作失败', 'error');
        }
      } catch (error) {
        Utils.showMessage('网络请求失败', 'error');
      }
    });
  });
});

// API请求封装
class ApiService {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
  }

  async get(endpoint) {
    return await Utils.request(`${this.baseURL}${endpoint}`, { method: 'GET' });
  }

  async post(endpoint, data) {
    return await Utils.request(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return await Utils.request(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return await Utils.request(`${this.baseURL}${endpoint}`, { method: 'DELETE' });
  }
}

// 导出API服务实例
window.ApiService = new ApiService();
window.Utils = Utils;