const products=[
  {id:1,name:"Classic Oxford Shirt",brand:"Viyon Men",img:"images/WhatsApp Image 2026-04-28 at 2.01.12 PM (1).jpeg",price:899,original:1799,cat:"men",tag:"sale",rating:4.3,reviews:1243,sizes:["S","M","L","XL","XXL"],desc:"Premium cotton Oxford shirt with subtle texture. Perfect for office and casual wear."},
  {id:2,name:"Slim Fit Jeans",brand:"Viyon Men",img:"images/kurta.jpeg",price:1299,original:2499,cat:"men",tag:"sale",rating:4.5,reviews:2341,sizes:["28","30","32","34","36"],desc:"Stretchable slim-fit denim jeans. Comfortable all-day wear."},
  {id:3,name:"Graphic Round Tee",brand:"Viyon Men",img:"images/WhatsApp Image 2026-04-28 at 2.42.09 PM.jpeg",price:449,original:799,cat:"men",tag:"new",rating:4.1,reviews:876,sizes:["S","M","L","XL"],desc:"Soft cotton graphic t-shirt with trendy print. Casual everyday wear."},
  {id:4,name:"Boys Cargo Shorts",brand:"Viyon Kids",img:"images/WhatsApp Image 2026-04-28 at 2.42.09 PM (1).jpeg",price:549,original:999,cat:"kids",tag:"new",rating:4.4,reviews:654,sizes:["4-5Y","6-7Y","8-9Y","10-11Y"],desc:"Durable cargo shorts for active boys. Multiple pockets, easy care fabric."},
  {id:5,name:"Girls Floral Dress",brand:"Viyon Kids",img:"images/WhatsApp Image 2026-04-28 at 2.42.08 PM.jpeg",price:799,original:1499,cat:"kids",tag:"sale",rating:4.6,reviews:987,sizes:["3-4Y","5-6Y","7-8Y","9-10Y"],desc:"Beautiful floral print dress for girls. Soft, breathable fabric."},
  {id:6,name:"Men's Polo Shirt",brand:"Viyon Men",img:"images/WhatsApp Image 2026-04-28 at 2.42.08 PM (1).jpeg",price:699,original:1299,cat:"men",tag:"new",rating:4.2,reviews:543,sizes:["S","M","L","XL","XXL"],desc:"Classic polo shirt in premium pique cotton. Sporty and smart look."},
  {id:7,name:"Kids Winter Jacket",brand:"Viyon Kids",img:"images/WhatsApp Image 2026-04-28 at 2.46.21 PM.jpeg",price:1499,original:2999,cat:"kids",tag:"sale",rating:4.7,reviews:1123,sizes:["4-5Y","6-7Y","8-9Y","10-11Y","12-13Y"],desc:"Warm quilted jacket for kids. Wind-resistant with cosy inner lining."},
  {id:8,name:"Men's Track Pants",brand:"Viyon Men",img:"images/WhatsApp Image 2026-04-28 at 2.46.22 PM.jpeg",price:599,original:1099,cat:"men",tag:"new",rating:4.0,reviews:432,sizes:["S","M","L","XL"],desc:"Comfortable track pants with elastic waistband. Ideal for sports and lounging."},
];

let cart=[];
let currentFilter='all';
let currentProduct=null;
let prevPage='home';

function showPage(p){
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  document.getElementById('page-'+p).classList.add('active');
  if(p==='cart')renderCart();
  if(p==='checkout')renderCheckout();
  window.scrollTo(0,0);
}

function goHome(){prevPage='home';showPage('home');renderProducts()}
function goBack(){showPage(prevPage||'home')}

function renderProducts(filter){
  const f=filter||currentFilter;
  const grid=document.getElementById('productsGrid');
  let filtered=products;
  if(f==='men')filtered=products.filter(p=>p.cat==='men');
  else if(f==='kids')filtered=products.filter(p=>p.cat==='kids');
  else if(f==='sale')filtered=products.filter(p=>p.tag==='sale');
  else if(f==='new')filtered=products.filter(p=>p.tag==='new');
  grid.innerHTML=filtered.map(p=>{
    const disc=Math.round((1-p.price/p.original)*100);
    return`<div class="product-card" onclick="showDetail(${p.id})">
      <div class="product-img">
        <div class="badge ${p.tag==='sale'?'sale':'new'}">${p.tag==='sale'?disc+'% OFF':'NEW'}</div>
        <img src="${p.img}" style="width:100%;height:100%;object-fit:cover;">
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))} <span style="color:var(--text2);font-size:.72rem">(${p.reviews})</span></div>
        <div class="price-row">
          <span class="price">₹${p.price}</span>
          <span class="price-old">₹${p.original}</span>
          <span class="discount">${disc}% off</span>
        </div>
        <button class="add-cart-btn" onclick="event.stopPropagation();addCart(${p.id})">Add to Cart 🛒</button>
      </div>
    </div>`;
  }).join('');
}

function setFilter(f,btn){
  currentFilter=f;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(f);
}

function filterCat(c){
  showPage('home');
  const map={men:'men','men-jeans':'men','men-tshirt':'men','kids-boys':'kids','kids-girls':'kids','winter':'all'};
  currentFilter=map[c]||'all';
  setTimeout(()=>{
    renderProducts(currentFilter);
    document.getElementById('products-section').scrollIntoView({behavior:'smooth'});
  },100);
}

function showDetail(id){
  prevPage='home';
  currentProduct=products.find(p=>p.id===id);
  const p=currentProduct;
  const disc=Math.round((1-p.price/p.original)*100);
  document.getElementById('detailImg').innerHTML = `<img src="${p.img}" style="width:100%;height:100%;object-fit:cover;">`;
  document.getElementById('detailInfo').innerHTML=`
    <div class="detail-brand">${p.brand}</div>
    <div class="detail-name">${p.name}</div>
    <div class="detail-rating">
      <span class="rating-badge">★ ${p.rating}</span>
      <span style="font-size:.82rem;color:var(--text2)">${p.reviews.toLocaleString()} ratings</span>
    </div>
    <div class="detail-price-row">
      <span class="detail-price">₹${p.price}</span>
      <span class="detail-old">₹${p.original}</span>
      <span class="detail-disc">${disc}% off</span>
    </div>
    <p style="font-size:.85rem;color:var(--text2);margin-bottom:1rem">${p.desc}</p>
    <div class="size-label">Select Size:</div>
    <div class="size-options">${p.sizes.map((s,i)=>`<button class="size-btn${i===1?' active':''}" onclick="this.closest('.size-options').querySelectorAll('.size-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${s}</button>`).join('')}</div>
    <div class="detail-actions">
      <button class="btn-cart" onclick="addCart(${p.id})">🛒 Add to Cart</button>
      <button class="btn-buy" onclick="addCart(${p.id});showPage('cart')">⚡ Buy Now</button>
    </div>
    <table class="spec-table" style="margin-top:1.5rem">
      <tr><td>Brand</td><td>${p.brand}</td></tr>
      <tr><td>Category</td><td>${p.cat==='men'?"Men's Wear":"Kids Wear"}</td></tr>
      <tr><td>Available Sizes</td><td>${p.sizes.join(', ')}</td></tr>
      <tr><td>Rating</td><td>★ ${p.rating}/5</td></tr>
      <tr><td>Returns</td><td>10 Day Return Policy</td></tr>
      <tr><td>Delivery</td><td>Free Delivery</td></tr>
    </table>
  `;
  showPage('detail');
}

function addCart(id){
  const p=products.find(x=>x.id===id);
  const ex=cart.find(x=>x.id===id);
  if(ex)ex.qty++;
  else cart.push({...p,qty:1});
  updateCartBadge();
  showToast(`${p.name} added to cart!`);
}

function updateCartBadge(){
  const total=cart.reduce((a,b)=>a+b.qty,0);
  document.getElementById('cartCount').textContent=total;
}

function renderCart(){
  const list=document.getElementById('cartItemsList');
  const empty=document.getElementById('emptyCart');
  document.getElementById('cartItemCount').textContent=cart.length;
  if(!cart.length){list.innerHTML='';empty.style.display='block';document.querySelector('.price-summary').style.display='none';return}
  empty.style.display='none';document.querySelector('.price-summary').style.display='block';
  list.innerHTML=cart.map(item=>{
    const disc=Math.round((1-item.price/item.original)*100);
    return`<div class="cart-item">
      <img src="${item.img}" style="width:100%;height:100%;object-fit:cover;">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.brand} | Size: M</div>
        <div class="cart-item-price">₹${(item.price*item.qty).toLocaleString()} <span style="font-size:.75rem;color:#aaa;text-decoration:line-through">₹${(item.original*item.qty).toLocaleString()}</span> <span style="color:#388e3c;font-size:.75rem">${disc}% off</span></div>
        <div class="qty-ctrl">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${item.id})">✕ Remove</button>
      </div>
    </div>`;
  }).join('');
  updateSummary();
}

function changeQty(id,d){
  const item=cart.find(x=>x.id===id);
  if(item){item.qty+=d;if(item.qty<=0)cart=cart.filter(x=>x.id!==id)}
  updateCartBadge();renderCart();
}

function removeItem(id){cart=cart.filter(x=>x.id!==id);updateCartBadge();renderCart()}

function updateSummary(){
  const orig=cart.reduce((a,b)=>a+b.original*b.qty,0);
  const actual=cart.reduce((a,b)=>a+b.price*b.qty,0);
  const disc=orig-actual;
  const count=cart.reduce((a,b)=>a+b.qty,0);
  document.getElementById('psCount').textContent=count;
  document.getElementById('psOriginal').textContent='₹'+orig.toLocaleString();
  document.getElementById('psDiscount').textContent='-₹'+disc.toLocaleString();
  document.getElementById('psTotal').textContent='₹'+actual.toLocaleString();
  document.getElementById('psSave').textContent='You save ₹'+disc.toLocaleString()+' on this order!';
}

function renderCheckout(){
  const orig=cart.reduce((a,b)=>a+b.original*b.qty,0);
  const actual=cart.reduce((a,b)=>a+b.price*b.qty,0);
  const disc=orig-actual;
  document.getElementById('co-sub').textContent='₹'+orig.toLocaleString();
  document.getElementById('co-disc').textContent='-₹'+disc.toLocaleString();
  document.getElementById('co-total').textContent='₹'+actual.toLocaleString();
  document.getElementById('checkoutItems').innerHTML=cart.map(i=>`<div style="display:flex;justify-content:space-between;font-size:.8rem;padding:.3rem 0;border-bottom:1px dashed #eee"><span>${i.icon} ${i.name} ×${i.qty}</span><span>₹${(i.price*i.qty).toLocaleString()}</span></div>`).join('');
}

function selectAddr(el){document.querySelectorAll('.addr-option').forEach(a=>a.classList.remove('selected'));el.classList.add('selected')}
function toggleNewAddr(el){selectAddr(el);const f=document.getElementById('newAddrForm');f.style.display=f.style.display==='none'?'block':'none'}
function saveAddress(){document.getElementById('newAddrForm').style.display='none';showToast('Address saved!')}

function placeOrder(){
  const oid='VYN'+Date.now().toString().slice(-6);
  document.getElementById('orderId').textContent='VYN-2024-'+oid;
  cart=[];updateCartBadge();
  showPage('success');
}

function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}

function doSearch(){
  const q=document.getElementById('searchInput').value.toLowerCase();
  if(!q)return;
  currentFilter='all';
  showPage('home');
  setTimeout(()=>{
    renderProducts();
    document.getElementById('products-section').scrollIntoView({behavior:'smooth'});
  },100);
}

function scrollToProducts(){document.getElementById('products-section').scrollIntoView({behavior:'smooth'})}
renderProducts();