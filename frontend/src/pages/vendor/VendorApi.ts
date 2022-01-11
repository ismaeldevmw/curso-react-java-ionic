import Vendor from './Vendor';

export function searchVendors() {
  let vendors = localStorage['vendors'];
  if (!vendors) {
    vendors = [];
  } else {
    vendors = JSON.parse(vendors);
  }
  return vendors;
}

export function removeVendor(id: string) {
  let vendors = searchVendors();
  let index = vendors.findIndex((vendor: Vendor) => vendor.id === id);
  vendors.splice(index, 1);
  localStorage['vendors'] = JSON.stringify(vendors);
}

export function saveVendor(vendor: Vendor) {
  let vendors = searchVendors();
  if (vendor.id) {
    // Edit
    let index = vendors.findIndex((c: Vendor) => c.id === vendor.id);
    vendors[index] = vendor;
  } else {
    // Create
    vendor.id = String(Math.round(Math.random() * 1000));
    vendors.push(vendor);
  }
  localStorage['vendors'] = JSON.stringify(vendors);
}

export function searchVendorById(id: string) {
  let vendors = searchVendors();
  return vendors.find((vendor: Vendor) => vendor.id === id);
}
