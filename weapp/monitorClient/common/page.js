export default function(options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: '主机CPU监控'
      };
    },
    ...options
  });
}
