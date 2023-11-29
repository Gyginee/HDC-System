
const backendBaseUrl = 'http://127.0.0.1:8000';

new Vue({
    el: '#app',
    data: {
        staffList: [],
        newStaff: { fullname: '', email: '' },
        editStaff: { id: null, fullname: '', email: '' },
        pageSize: 5, // Number of items per page
        currentPage: 1,
    },
    computed: {
        paginatedStaffList() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.staffList.slice(startIndex, endIndex);
        },
        pageCount() {
            return Math.ceil(this.staffList.length / this.pageSize);
        },
    },
    mounted() {
        this.fetchStaffList();
    },
    methods: {
        fetchStaffList() {
            fetch(`${backendBaseUrl}/api/staffs`)
                .then(response => response.json())
                .then(data => {
                    this.staffList = data.data;
                })
                .catch(error => {
                    console.error('Error fetching staff list:', error);
                });
        },
        addStaff() {
            fetch(`${backendBaseUrl}/api/staffs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.newStaff),
            })
                .then(response => response.json())
                .then(data => {
                    this.staffList.push(data.data);
                    this.newStaff = { fullname: '', email: '' };
                    $('#addStaffModal').modal('hide');
                })
                .catch(error => {
                    console.error('Error adding staff member:', error);
                });
        },
        editStaff(staff) {
            this.editStaff = { ...staff };
        },
        updateStaff() {
            fetch(`${backendBaseUrl}/api/staffs/${this.editStaff.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.editStaff),
            })
                .then(response => response.json())
                .then(data => {
                    const index = this.staffList.findIndex(s => s.id === this.editStaff.id);
                    if (index !== -1) {
                        this.staffList.splice(index, 1, data.data);
                        $('#editStaffModal').modal('hide');
                    }
                })
                .catch(error => {
                    console.error('Error updating staff member:', error);
                });
        },
        deleteStaff(staffId) {
            if (confirm('Are you sure you want to delete this staff member?')) {
                fetch(`${backendBaseUrl}/api/staffs/${staffId}`, {
                    method: 'DELETE',
                })
                    .then(response => {
                        if (response.status === 204) {
                            this.staffList = this.staffList.filter(staff => staff.id !== staffId);
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting staff member:', error);
                    });
            }
        },
    },
});
