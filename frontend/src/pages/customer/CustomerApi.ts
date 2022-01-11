import Customer from './Customer';

export function searchCustomers() {
  let customers = localStorage['customers'];
  if (!customers) {
    customers = [];
  } else {
    customers = JSON.parse(customers);
  }
  return customers;
}

export function removeCustomer(id: string) {
  let customers = searchCustomers();
  let index = customers.findIndex((customer: Customer) => customer.id === id);
  customers.splice(index, 1);
  localStorage['customers'] = JSON.stringify(customers);
}

export function saveCustomer(customer: Customer) {
  let customers = searchCustomers();
  if (customer.id) {
    // Edit
    let index = customers.findIndex((c: Customer) => c.id === customer.id);
    customers[index] = customer;
  } else {
    // Create
    customer.id = String(Math.round(Math.random() * 1000));
    customers.push(customer);
  }
  localStorage['customers'] = JSON.stringify(customers);
}

export function searchCustomerById(id: string) {
  let customers = searchCustomers();
  return customers.find((customer: Customer) => customer.id === id);
}
