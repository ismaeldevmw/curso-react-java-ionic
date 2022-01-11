import Employee from './Employee';

export function searchEmployees() {
  let employees = localStorage['employees'];
  if (!employees) {
    employees = [];
  } else {
    employees = JSON.parse(employees);
  }
  return employees;
}

export function removeEmployee(id: string) {
  let employees = searchEmployees();
  let index = employees.findIndex((employee: Employee) => employee.id === id);
  employees.splice(index, 1);
  localStorage['employees'] = JSON.stringify(employees);
}

export function saveEmployee(employee: Employee) {
  let employees = searchEmployees();
  if (employee.id) {
    // Edit
    let index = employees.findIndex((c: Employee) => c.id === employee.id);
    employees[index] = employee;
  } else {
    // Create
    employee.id = String(Math.round(Math.random() * 1000));
    employees.push(employee);
  }
  localStorage['employees'] = JSON.stringify(employees);
}

export function searchEmployeeById(id: string) {
  let employees = searchEmployees();
  return employees.find((employee: Employee) => employee.id === id);
}
