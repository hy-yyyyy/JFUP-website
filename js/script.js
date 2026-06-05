const loginMask=document.getElementById('loginMask');
const openLogin=document.getElementById('openLogin');
const closeLogin=document.getElementById('closeLogin');
const loginBtn=document.getElementById('loginSubmit');
const adminBox=document.getElementById('adminBox');
const adminTip=document.getElementById('adminTip');
const logout=document.getElementById('logoutBtn');

openLogin.onclick=()=>loginMask.style.display='flex';
closeLogin.onclick=()=>loginMask.style.display='none';

const userData={
    admin:{name:"战队队长",role:"超级管理员",pwd:"123456"},
    pm:{name:"项目管理",role:"管理员",pwd:"123"},
    op:{name:"运营经理",role:"宣运组长",pwd:"456"},
    mech:{name:"机械组长",role:"组别管理员",pwd:"789"},
    elec:{name:"电控组长",role:"组别管理员",pwd:"111"},
    vision:{name:"视觉组长",role:"组别管理员",pwd:"222"},
    member:{name:"普通队员",role:"普通成员",pwd:"000"}
};

loginBtn.onclick=()=>{
    let uid=document.getElementById('userName').value.trim();
    let pw=document.getElementById('pwd').value.trim();
    if(!userData[uid]){
        alert('账号不存在');
        return;
    }
    let uinfo=userData[uid];
    if(uinfo.pwd!==pw){
        alert('密码错误');
        return;
    }
    loginMask.style.display='none';
    adminBox.style.display='block';
    adminTip.innerText=`欢迎：${uinfo.name} | 用户权限：${uinfo.role}`;
}

logout.onclick=()=>{
    adminBox.style.display='none';
    document.getElementById('userName').value='';
    document.getElementById('pwd').value='';
}



// 组成员展开/收起
function toggleGroup(id) {
  const list = document.getElementById(id + '-list');
  const btn = document.querySelector(`[onclick="toggleGroup('${id}')"]`);
  
  if (list.classList.contains('hidden')) {
    list.classList.remove('hidden');
    btn.textContent = '收起 -';
  } else {
    list.classList.add('hidden');
    btn.textContent = '更多 +';
  }
}

// 背景图预加载，避免轮播时加载卡顿
window.onload = function() {
    const bgImages = [
        'img/bg1.jpg',
        'img/bg2.jpg',
        'img/bg3.jpg',
        'img/bg4.jpg',
        'img/bg5.jpg'
    ];
    bgImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// ===================== 资源中心上传功能 =====================
document.addEventListener('DOMContentLoaded', function() {
    const uploadSection = document.getElementById('uploadSection');
    const adminBox = document.getElementById('adminBox');
    const uploadForm = document.getElementById('uploadForm');

    // 监听登录状态 → 显示上传
    const observer = new MutationObserver(() => {
        uploadSection.style.display = adminBox.style.display === 'block' ? 'block' : 'none';
    });
    observer.observe(adminBox, { attributes: true });

    // 上传提交
    uploadForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('fileName').value;
        const type = document.getElementById('fileType').value;
        const file = document.getElementById('fileUpload').files[0];
        if (!name || !type || !file) {
            alert('请填写完整信息');
            return;
        }
        alert('上传成功！\n文件名：' + name);
        uploadForm.reset();
    });
});

// ===================== 资源中心侧边栏菜单功能 =====================
document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu-item.has-child');
    const subItems = document.querySelectorAll('.sub-item');
    const allItems = document.querySelectorAll('.menu-item[data-type="all"]');
    const cards = document.querySelectorAll('.resource-card');

    // 点击展开/折叠子菜单 + 双击也能展开
    menuItems.forEach(item => {
        item.addEventListener('click', toggleSubMenu);
        item.addEventListener('dblclick', toggleSubMenu);
    });
    function toggleSubMenu() {
        const sub = this.nextElementSibling;
        const arrow = this.querySelector('.arrow');
        sub.style.display = sub.style.display === 'block' ? 'none' : 'block';
        arrow.textContent = sub.style.display === 'block' ? '▲' : '▼';
    }

    // 筛选资料
    function filterCards(type) {
        cards.forEach(card => {
            if (type === 'all' || card.dataset.type === type) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // 点击全部
    allItems.forEach(item => {
        item.addEventListener('click', () => {
            setActive(item);
            filterCards('all');
        });
    });

    // 点击子分类
    subItems.forEach(item => {
        item.addEventListener('click', () => {
            setActive(item);
            filterCards(item.dataset.type);
        });
    });

    // 高亮当前选中
    function setActive(el) {
        document.querySelectorAll('.menu-item,.sub-item').forEach(i => i.classList.remove('active'));
        el.classList.add('active');
    }

    // 默认显示全部
    filterCards('all');
});