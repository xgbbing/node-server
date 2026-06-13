"use strict";
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
        }
        catch (error) {
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
                }
                else {
                    Utils.showMessage(response.message || '操作失败', 'error');
                }
            }
            catch (error) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYWxpY2UvRGVza3RvcC9vdGhlcmNvZGUvbm9kZS1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL3B1YmxpYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxtQkFBbUI7QUFDbkIsTUFBTSxLQUFLO0lBQ1Q7O09BRUc7SUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxHQUFHLEVBQUU7UUFDcEMsTUFBTSxjQUFjLEdBQUc7WUFDckIsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7YUFDbkM7U0FDRixDQUFDO1FBRUYsTUFBTSxhQUFhLEdBQUc7WUFDcEIsR0FBRyxjQUFjO1lBQ2pCLEdBQUcsT0FBTztZQUNWLE9BQU8sRUFBRTtnQkFDUCxHQUFHLGNBQWMsQ0FBQyxPQUFPO2dCQUN6QixHQUFHLE9BQU8sQ0FBQyxPQUFPO2FBQ25CO1NBQ0YsQ0FBQztRQUVGLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsT0FBTyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM5QjtRQUFDLE9BQU8sS0FBVSxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEMsTUFBTSxLQUFLLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxNQUFNO1FBQ3ZDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FB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