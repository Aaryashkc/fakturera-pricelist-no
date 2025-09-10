import React, { useState, useEffect, useRef } from 'react';
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
  CreditCard,
  X,
  Edit3,
  Trash2
} from 'lucide-react';
import usePriceStore from '../store/usePriceStore';

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

    const dialogId = `details-modal-${selectedProduct.id}`;
    const titleId = `details-modal-title-${selectedProduct.id}`;
    const modalRef = useRef(null);
    const firstFocusableRef = useRef(null);
    const previouslyFocusedElementRef = useRef(null);

    useEffect(() => {
      previouslyFocusedElementRef.current = document.activeElement;
      // Focus the first focusable element when modal opens
      const timer = setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 0);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          setShowDetailsModal(false);
        }

        // Focus trap
        if (e.key === 'Tab' && modalRef.current) {
          const focusable = modalRef.current.querySelectorAll(
            'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown, true);
      return () => {
        document.removeEventListener('keydown', handleKeyDown, true);
        // Restore focus to the previously focused trigger
        previouslyFocusedElementRef.current?.focus?.();
      };
    }, []);

    return (
      <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
        <div
          ref={modalRef}
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          id={dialogId}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h3 id={titleId}>Product Details</h3>
            <button
              onClick={() => setShowDetailsModal(false)}
              aria-label="Close details"
              ref={firstFocusableRef}
            >
              <X size={20} />
            </button>
          </div>
          <div className="modal-body">
            <div className="detail-row">
              <span className="detail-label">Article No:</span>
              <span className="detail-value">{selectedProduct.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Product/Service:</span>
              <span className="detail-value">{selectedProduct.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">In Price:</span>
              <span className="detail-value">{selectedProduct.inPrice}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Price:</span>
              <span className="detail-value">{selectedProduct.price}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Unit:</span>
              <span className="detail-value">{selectedProduct.unit}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">In Stock:</span>
              <span className="detail-value">{selectedProduct.inStock}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Description:</span>
              <span className="detail-value">{selectedProduct.description}</span>
            </div>
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

  const ActionDropdown = ({ product, position = 'bottom-right', detailsOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef(null);
    const menuRef = useRef(null);
    const menuId = `action-menu-${product.id}`;
    const detailsId = `details-modal-${product.id}`;

    useEffect(() => {
      const onDocClick = (e) => {
        if (!menuRef.current || !triggerRef.current) return;
        if (!menuRef.current.contains(e.target) && !triggerRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      const onKey = (e) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      document.addEventListener('mousedown', onDocClick);
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('mousedown', onDocClick);
        document.removeEventListener('keydown', onKey);
      };
    }, []);

    useEffect(() => {
      if (isOpen && menuRef.current) {
        const firstItem = menuRef.current.querySelector('button');
        firstItem?.focus();
      }
    }, [isOpen]);

    const onTriggerKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
    };

    return (
      <div className="action-dropdown">
        <button
          ref={triggerRef}
          className="action-trigger"
          aria-haspopup="menu"
          aria-expanded={detailsOpen}
          aria-controls={detailsId}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={onTriggerKeyDown}
        >
          <MoreHorizontal size={16} />
        </button>
        {isOpen && (
          <div ref={menuRef} className={`dropdown-menu ${position}`} role="menu" id={menuId}>
            <button 
              id={`view-details-btn-${product.id}`}
              className="view-details-btn"
              role="menuitem" 
              onClick={() => {
                handleProductAction(product, 'details');
                setIsOpen(false);
              }}
            >
              <Eye size={18} />
              <span>View Details</span>
            </button>
            <button role="menuitem" onClick={() => {
              handleProductAction(product, 'edit');
              setIsOpen(false);
            }}>
              <Edit3 size={14} />
              Edit
            </button>
            <button role="menuitem" onClick={() => {
              handleProductAction(product, 'delete');
              setIsOpen(false);
            }}>
              <Trash2 size={14} />
              Delete
            </button>
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

  const SearchSection = () => (
    <div className="search-section">
      <div className="search-container">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search Article No ..."
            value={searchArticle}
            onChange={(e) => setSearchArticle(e.target.value)}
          />
          <Search className="search-icon" size={20} />
        </div>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search Product ..."
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
          <Search className="search-icon" size={20} />
        </div>
      </div>
      
      <div className="toolbar">
        <button className="toolbar-btn new-btn">
          <Plus size={16} />
          <span className="toolbar-text">New Product</span>
        </button>
        <button className="toolbar-btn">
          <FileText size={16} />
          <span className="toolbar-text">Print List</span>
        </button>
        <button className="toolbar-btn">
          <Settings size={16} />
          <span className="toolbar-text">Advanced mode</span>
        </button>
      </div>
    </div>
  );

  const ProductTable = () => {
    const columns = ['Article No.', 'Product/Service', 'In Price', 'Price', 'Unit', 'In Stock', 'Description', ''];

    const renderCellContent = (product, field, content) => {
      const key = `${product.id}-${field}`;
      const isExpanded = expandedCells[key];
      const shouldTruncate = field === 'description' || field === 'name';
      
      if (!shouldTruncate) {
        return <span>{content}</span>;
      }

      const needsTruncation = content.length > 20;

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
    };

    return (
      <div className="product-table">
        <div className="table-header">
          {columns.map((col, index) => (
            <div key={index} className="col">{col}</div>
          ))}
        </div>
        {products.map((product, index) => (
          <div key={product.id} className="table-row">
            <div className="col">{renderCellContent(product, 'id', product.id)}</div>
            <div className="col">{renderCellContent(product, 'name', product.name)}</div>
            <div className="col">{renderCellContent(product, 'inPrice', product.inPrice)}</div>
            <div className="col">{renderCellContent(product, 'price', product.price)}</div>
            <div className="col">{renderCellContent(product, 'unit', product.unit)}</div>
            <div className="col">{renderCellContent(product, 'inStock', product.inStock)}</div>
            <div className="col">{renderCellContent(product, 'description', product.description)}</div>
            <div className="col">
              <ActionDropdown
                product={product}
                detailsOpen={showDetailsModal && selectedProduct?.id === product.id}
              />
            </div>
          </div>
        ))}
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

  // Loading state
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
          <SearchSection />
          <ProductTable />
        </div>
      </div>

      <ProductDetailsModal />

    </div>
  );
};

export default PriceList;