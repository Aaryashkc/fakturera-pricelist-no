import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  Search, 
  Plus, 
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
  CreditCard,
  X,
  Edit3,
  Trash2
} from 'lucide-react';
import usePriceStore from '../store/usePriceStore';

const SearchSection = ({ searchArticle, setSearchArticle, searchProduct, setSearchProduct }) => (
  <div className="search-section">
    <div className="search-container">
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Search Article No..."
          value={searchArticle}
          onChange={(e) => setSearchArticle(e.target.value)}
        />
        <Search className="search-icon" size={20} />
      </div>
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Search Product..."
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
        <Search className="search-icon" size={20} />
      </div>
    </div>
    
    <div className="toolbar">
      <button className="toolbar-btn new-btn" title="Add New Product">
        <Plus size={16} />
        <span className="toolbar-text">New</span>
      </button>
      <button className="toolbar-btn" title="Export to File">
        <FileText size={16} />
        <span className="toolbar-text">Export</span>
      </button>
      <button className="toolbar-btn" title="Settings">
        <Settings size={16} />
        <span className="toolbar-text">Settings</span>
      </button>
    </div>
  </div>
);

const PriceList = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchArticle, setSearchArticle] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [expandedCells, setExpandedCells] = useState({});

  // Get products from store
  const { prices, loading, error, fetchPrices } = usePriceStore();

  // Fetch products on component mount
  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  // Map backend data to match frontend structure
  const products = prices.map(item => ({
    id: item.articleNo || item.id,
    name: item.productService || '',
    price: item.price || 0,
    inPrice: item.inPrice || 0,
    inStock: item.inStock || 0,
    unit: item.unit || 'pcs',
    description: item.description || ''
  }));

  // Apply filters from search inputs
  const filteredProducts = products.filter(p => {
    const articleQuery = (searchArticle || '').trim().toLowerCase();
    const productQuery = (searchProduct || '').trim().toLowerCase();

    const matchesArticle = !articleQuery || String(p.id).toLowerCase().includes(articleQuery);
    const matchesProduct = !productQuery || String(p.name).toLowerCase().includes(productQuery);
    return matchesArticle && matchesProduct;
  });

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

  const toggleCellExpansion = (productId, field) => {
    const key = `${productId}-${field}`;
    setExpandedCells(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleProductAction = (product, action) => {
    if (action === 'details') {
      setSelectedProduct(product);
      setShowDetailsModal(true);
    }
    // Add other actions like edit, delete here
    console.log(`Action: ${action} on product:`, product);
  };

  const ProductDetailsModal = () => {
    if (!showDetailsModal || !selectedProduct) return null;

    const modalRef = useRef(null);
    const closeBtnRef = useRef(null);
    const previouslyFocusedElementRef = useRef(null);

    useEffect(() => {
      previouslyFocusedElementRef.current = document.activeElement;
      closeBtnRef.current?.focus();

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setShowDetailsModal(false);
        }

        // Focus trap
        if (e.key === 'Tab' && modalRef.current) {
          const focusable = modalRef.current.querySelectorAll(
            'button:not([disabled]), input:not([disabled])'
          );
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown, true);
      return () => {
        document.removeEventListener('keydown', handleKeyDown, true);
        previouslyFocusedElementRef.current?.focus?.();
      };
    }, []);

    const productDetails = [
      { label: 'Article No', value: selectedProduct.id },
      { label: 'Product/Service', value: selectedProduct.name },
      { label: 'In Price', value: selectedProduct.inPrice },
      { label: 'Price', value: selectedProduct.price },
      { label: 'Unit', value: selectedProduct.unit },
      { label: 'In Stock', value: selectedProduct.inStock },
      { label: 'Description', value: selectedProduct.description }
    ];

    return (
      <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
        <div
          ref={modalRef}
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h3 id="modal-title">Product Details</h3>
            <button
              ref={closeBtnRef}
              onClick={() => setShowDetailsModal(false)}
              aria-label="Close details"
              className="modal-close-btn"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="modal-body">
            {productDetails.map(({ label, value }) => (
              <div key={label} className="detail-row">
                <span className="detail-label">{label}:</span>
                <span className="detail-value">{value}</span>
              </div>
            ))}
          </div>
          
          <div className="modal-actions">
            <button className="modal-btn edit-btn">
              <Edit3 size={16} />
              Edit
            </button>
            <button className="modal-btn delete-btn">
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ActionDropdown = ({ product }) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target) && 
            triggerRef.current && !triggerRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsOpen(false);
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    useEffect(() => {
      if (isOpen && menuRef.current) {
        menuRef.current.querySelector('button')?.focus();
      }
    }, [isOpen]);

    const handleAction = (action) => {
      handleProductAction(product, action);
      setIsOpen(false);
    };

    const actions = [
      { icon: Eye, label: 'View Details', action: 'details', size: 18 },
      { icon: Edit3, label: 'Edit', action: 'edit', size: 14 },
      { icon: Trash2, label: 'Delete', action: 'delete', size: 14 }
    ];

    return (
      <div className="action-dropdown">
        <button
          ref={triggerRef}
          className="action-trigger"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
        >
          <MoreHorizontal size={16} />
        </button>
        
        {isOpen && (
          <div ref={menuRef} className="dropdown-menu" role="menu">
            {actions.map(({ icon: Icon, label, action, size }) => (
              <button 
                key={action}
                className={`dropdown-item ${action === 'details' ? 'view-details-btn' : ''}`}
                role="menuitem" 
                onClick={() => handleAction(action)}
              >
                <Icon size={size} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const Header = () => (
    <div className="header">
      <div className="header-content">
        <div className="user-info">
          <button
            className="hamburger-btn"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={22} color="white" />
          </button>
          <div className="avatar">
            <Users size={20} color="white" />
          </div>
          <div className="user-details">
            <div className="user-name">John Andre</div>
            <div className="company">Storfjord AS</div>
          </div>
        </div>
        <div className="language-selector">
          <span>English</span>
          <div className="flag uk-flag"></div>
        </div>
      </div>
    </div>
  );

  

  const ProductTable = () => {
    const columns = ['Article No.', 'Product/Service', 'In Price', 'Price', 'Unit', 'In Stock', 'Description', ''];

    const renderCellContent = (product, field, content) => {
      if (!content) return <span></span>;
      
      if (field === 'description') {
        return (
          <div className="cell-content description-cell">
            <span className="truncated">{content}</span>
          </div>
        );
      }
      
      if (field === 'name') {
        const key = `${product.id}-${field}`;
        const isExpanded = expandedCells[key];
        const needsTruncation = content.length > 30;
        
        return (
          <div className="cell-content">
            <span className={isExpanded ? 'expanded' : 'truncated'}>
              {content}
            </span>
            {needsTruncation && (
              <button 
                className="expand-btn"
                onClick={() => toggleCellExpansion(product.id, field)}
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? '▲' : '...'}
              </button>
            )}
          </div>
        );
      }
      
      return <span>{content}</span>;
    };

    return (
      <div className="product-table">
        <div className="table-header">
          {columns.map((col, index) => (
            <div key={index} className="col">{col}</div>
          ))}
        </div>
        {filteredProducts.length === 0 ? (
          <div className="table-row">
            <div className="col" style={{ gridColumn: '1 / -1', color: '#64748b' }}>
              No matching products. Adjust your search.
            </div>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="table-row">
              <div className="col border-row">{renderCellContent(product, 'id', product.id)}</div>
              <div className="col border-row">{renderCellContent(product, 'name', product.name)}</div>
              <div className="col border-row">{renderCellContent(product, 'inPrice', product.inPrice)}</div>
              <div className="col border-row">{renderCellContent(product, 'price', product.price)}</div>
              <div className="col border-row">{renderCellContent(product, 'unit', product.unit)}</div>
              <div className="col border-row">{renderCellContent(product, 'inStock', product.inStock)}</div>
              <div className="col border-row">{renderCellContent(product, 'description', product.description)}</div>
              <div className="col1">
                <ActionDropdown product={product} />
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  const Sidebar = () => {
    return (
      <div className="sidebar">
        <div className="sidebar-header">Menu</div>
        <div className="menu-items">
          {menuItems.map((item, index) => (
            <div key={index} className={`menu-item ${item.active ? 'active' : ''}`}>
              <item.icon size={16} color={item.color} />
              <span className="menu-text">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading price list...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 p-6 rounded-lg max-w-md text-center">
          <h2 className="text-lg font-medium text-red-800">Error loading price list</h2>
          <p className="mt-2 text-red-600">{error}</p>
          <button 
            onClick={fetchPrices}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      {isMobileMenuOpen && (
        <div className="mobile-sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-sidebar" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-sidebar-header">
              <span>Menu</span>
              <button className="mobile-close-btn" aria-label="Close menu" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="mobile-menu-items">
              {menuItems.map((item, index) => (
                <button key={index} className={`mobile-menu-item ${item.active ? 'active' : ''}`}>
                  <item.icon size={18} color={item.color} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="main-layout">
        <Sidebar />
        
        <div className="content">
          <SearchSection 
            searchArticle={searchArticle}
            setSearchArticle={setSearchArticle}
            searchProduct={searchProduct}
            setSearchProduct={setSearchProduct}
          />
          <ProductTable />
        </div>
      </div>

      <ProductDetailsModal />

    </div>
  );
};

export default PriceList;