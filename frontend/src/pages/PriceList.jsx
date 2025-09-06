import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Plus, 
  Archive, 
  Settings, 
  FileText, 
  Users, 
  Building, 
  BookOpen, 
  Package, 
  UserX, 
  Gift, 
  Boxes, 
  Import, 
  LogOut,
  MoreHorizontal,
  Eye,
  CreditCard
} from 'lucide-react';

const PriceList = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('mobile'); // 'mobile', 'desktop', 'price-list'

  // Sample data
  const products = [
    {
      id: '1234567890',
      name: 'This is a test product with fifty characters this!',
      price: 1500800,
      inPrice: 900500,
      inStock: 1500800,
      unit: 'kilometers/hour',
      description: 'This is the description with fifty characters this...'
    },
    {
      id: '1234567891',
      name: 'Sony DSLR 12345',
      price: 15000,
      inPrice: 12000,
      inStock: 50,
      unit: 'pieces',
      description: 'Professional camera for photography'
    },
    {
      id: '1234567892',
      name: 'Random product',
      price: 1234,
      inPrice: 800,
      inStock: 25,
      unit: 'units',
      description: 'A random product for testing'
    }
  ];

  const menuItems = [
    { icon: FileText, label: 'Invoices', color: '#22d3ee' },
    { icon: Users, label: 'Customers', color: '#34d399' },
    { icon: Building, label: 'My Business', color: '#60a5fa' },
    { icon: BookOpen, label: 'Invoice Journal', color: '#22d3ee' },
    { icon: CreditCard, label: 'Price List', color: '#f59e0b', active: true },
    { icon: Package, label: 'Multiple Invoicing', color: '#22d3ee' },
    { icon: UserX, label: 'Unpaid Invoices', color: '#ec4899' },
    { icon: Gift, label: 'Offer', color: '#eab308' },
    { icon: Boxes, label: 'Inventory Control', color: '#22d3ee' },
    { icon: Eye, label: 'Member Invoicing', color: '#60a5fa' },
    { icon: Import, label: 'Import/Export', color: '#22d3ee' },
    { icon: LogOut, label: 'Log out', color: '#22d3ee' }
  ];

  const MobileView = () => (
    <div className="mobile-container">
      <div className="mobile-header">
        <button className="menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu size={20} color="white" />
        </button>
        <div className="language-selector">
          <span>English</span>
          <div className="flag uk-flag"></div>
        </div>
      </div>

      <div className="search-container">
        <div className="search-box">
          <input type="text" placeholder="Search Article No ..." />
          <Search className="search-icon" size={20} />
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search Product ..." />
          <Search className="search-icon" size={20} />
        </div>
      </div>

      <div className="action-buttons">
        <button className="action-btn new-btn">
          <Plus size={16} />
        </button>
        <button className="action-btn archive-btn">
          <Archive size={16} />
        </button>
        <button className="action-btn settings-btn">
          <Settings size={16} />
        </button>
      </div>

      {currentView === 'mobile' && (
        <div className="product-table mobile-table">
          <div className="table-header">
            <div className="col">Article No.</div>
            <div className="col">Product/Service</div>
            <div className="col">Price</div>
            <div className="col">In Stock</div>
            <div className="col">Unit</div>
            <div className="col"></div>
          </div>
          {products.map((product, index) => (
            <div key={product.id} className={`table-row ${index === 1 ? 'selected' : ''}`}>
              <div className="col">{product.id}</div>
              <div className="col">{product.name}</div>
              <div className="col">{product.price}</div>
              <div className="col">{product.inStock}</div>
              <div className="col">{product.unit}</div>
              <div className="col">
                <MoreHorizontal size={16} />
              </div>
            </div>
          ))}
        </div>
      )}

      {currentView === 'price-list' && (
        <div className="price-list-container">
          <div className="product-header">
            <span>Product/Service</span>
            <span>Price</span>
          </div>
          {products.map((product, index) => (
            <div key={product.id} className={`product-item ${index === 2 ? 'selected' : ''}`}>
              <div className="product-name">{product.name}</div>
              <div className="product-price">{product.price}</div>
              <div className="product-actions">
                <MoreHorizontal size={16} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const DesktopView = () => (
    <div className="desktop-container">
      <div className="desktop-header">
        <div className="user-info">
          <div className="avatar">
            <Users size={20} color="white" />
          </div>
          <div className="user-details">
            <div className="user-name">John Andre</div>
            <div className="company">Storfjord AS</div>
          </div>
        </div>
        <div className="language-selector">
          <span>Norsk Bokmål</span>
          <div className="flag norway-flag"></div>
        </div>
      </div>

      <div className="desktop-content">
        <div className="sidebar">
          <div className="sidebar-header">Menu</div>
          <div className="menu-items">
            {menuItems.map((item, index) => (
              <div key={index} className={`menu-item ${item.active ? 'active' : ''}`}>
                <item.icon size={16} color={item.color} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="main-content">
          <div className="search-container desktop-search">
            <div className="search-box">
              <input type="text" placeholder="Search Article No ..." />
              <Search className="search-icon" size={20} />
            </div>
            <div className="search-box">
              <input type="text" placeholder="Search Product ..." />
              <Search className="search-icon" size={20} />
            </div>
          </div>

          <div className="toolbar">
            <button className="toolbar-btn new-btn">
              <Plus size={16} />
              <span>New Product</span>
            </button>
            <button className="toolbar-btn">
              <FileText size={16} />
              <span>Print List</span>
            </button>
            <button className="toolbar-btn">
              <Settings size={16} />
              <span>Advanced mode</span>
            </button>
          </div>

          <div className="desktop-table">
            <div className="table-header">
              <div className="col">Article No.</div>
              <div className="col">Product/Service</div>
              <div className="col">In Price</div>
              <div className="col">Price</div>
              <div className="col">Unit</div>
              <div className="col">In Stock</div>
              <div className="col">Description</div>
              <div className="col"></div>
            </div>
            {products.map((product, index) => (
              <div key={product.id} className={`table-row ${index === 0 ? 'selected' : ''}`}>
                <div className="col">{product.id}</div>
                <div className="col">{product.name}</div>
                <div className="col">{product.inPrice}</div>
                <div className="col">{product.price}</div>
                <div className="col">{product.unit}</div>
                <div className="col">{product.inStock}</div>
                <div className="col">{product.description}</div>
                <div className="col">
                  <MoreHorizontal size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">

      <MobileView />
      <DesktopView />
    </div>
  );
};

export default PriceList;