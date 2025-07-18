 class AdminPanel {
            constructor() {
                this.form = document.getElementById('adminForm');
                this.questionInput = document.getElementById('question');
                this.answerTextarea = document.getElementById('answer');
                this.submitBtn = document.getElementById('submitBtn');
                this.messageContainer = document.getElementById('messageContainer');
                this.characterCount = document.getElementById('characterCount');
                
                this.initializeEventListeners();
                this.loadSavedData();
            }

            initializeEventListeners() {
                // Form submission
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
                
                // Character count for textarea
                this.answerTextarea.addEventListener('input', () => this.updateCharacterCount());
                
                // Real-time validation
                this.questionInput.addEventListener('input', () => this.validateQuestion());
                this.answerTextarea.addEventListener('input', () => this.validateAnswer());
                
                // Auto-save functionality
                this.questionInput.addEventListener('input', () => this.autoSave());
                this.answerTextarea.addEventListener('input', () => this.autoSave());
                
                // Clear validation on focus
                this.questionInput.addEventListener('focus', () => this.clearValidation(this.questionInput));
                this.answerTextarea.addEventListener('focus', () => this.clearValidation(this.answerTextarea));
            }

            handleSubmit(e) {
                e.preventDefault();
                
                // Clear previous messages
                this.clearMessages();
                
                // Validate form
                if (!this.validateForm()) {
                    return;
                }
                
                // Show loading state
                this.setLoadingState(true);
                
                // Simulate API call
                this.submitData()
                    .then((msg) => {
                        this.showSuccessMessage(msg ||'Question and answer submitted successfully!');
                        this.resetForm();
                    })
                    .catch((error) => {
                        this.showErrorMessage(error.message || 'An error occurred while submitting the form.');
                    })
                    .finally(() => {
                        this.setLoadingState(false);
                    });
            }

            validateForm() {
                let isValid = true;
                
                if (!this.validateQuestion()) {
                    isValid = false;
                }
                
                if (!this.validateAnswer()) {
                    isValid = false;
                }
                
                return isValid;
            }

            validateQuestion() {
                const question = this.questionInput.value.trim();
                
                if (!question) {
                    this.addError(this.questionInput, 'Question is required');
                    return false;
                }
                
                if (question.length < 3) {
                    this.addError(this.questionInput, 'Question must be at least 3 characters long');
                    return false;
                }
                
                this.clearError(this.questionInput);
                return true;
            }

            validateAnswer() {
                const answer = this.answerTextarea.value.trim();
                
                if (!answer) {
                    this.addError(this.answerTextarea, 'Answer is required');
                    return false;
                }
                
                if (answer.length < 10) {
                    this.addError(this.answerTextarea, 'Answer must be at least 10 characters long');
                    return false;
                }
                
                if (answer.length > 1000) {
                    this.addError(this.answerTextarea, 'Answer must not exceed 1000 characters');
                    return false;
                }
                
                this.clearError(this.answerTextarea);
                return true;
            }

            addError(element, message) {
                element.classList.add('error');
                // You could add individual error messages here if needed
            }

            clearError(element) {
                element.classList.remove('error');
            }

            clearValidation(element) {
                element.classList.remove('error');
            }

            updateCharacterCount() {
                const currentLength = this.answerTextarea.value.length;
                const maxLength = 1000;
                
                this.characterCount.textContent = `${currentLength} / ${maxLength}`;
                
                // Update character count styling
                this.characterCount.classList.remove('warning', 'error');
                
                if (currentLength > maxLength * 0.9) {
                    this.characterCount.classList.add('warning');
                }
                
                if (currentLength > maxLength) {
                    this.characterCount.classList.add('error');
                }
            }

            setLoadingState(isLoading) {
                if (isLoading) {
                    this.submitBtn.disabled = true;
                    this.submitBtn.classList.add('loading');
                    this.submitBtn.textContent = 'Submitting...';
                } else {
                    this.submitBtn.disabled = false;
                    this.submitBtn.classList.remove('loading');
                    this.submitBtn.textContent = 'Submit';
                }
            }

            showSuccessMessage(message) {
                const messageEl = document.createElement('div');
                messageEl.className = 'success-message';
                messageEl.textContent = message;
                
                this.messageContainer.appendChild(messageEl);
                
                // Trigger animation
                setTimeout(() => {
                    messageEl.classList.add('show');
                }, 100);
                
                // Auto-hide after 5 seconds
                setTimeout(() => {
                    this.removeMessage(messageEl);
                }, 5000);
            }

            showErrorMessage(message) {
                const messageEl = document.createElement('div');
                messageEl.className = 'error-message';
                messageEl.textContent = message;
                
                this.messageContainer.appendChild(messageEl);
                
                // Trigger animation
                setTimeout(() => {
                    messageEl.classList.add('show');
                }, 100);
                
                // Auto-hide after 7 seconds
                setTimeout(() => {
                    this.removeMessage(messageEl);
                }, 7000);
            }

            removeMessage(messageEl) {
                messageEl.classList.remove('show');
                setTimeout(() => {
                    if (messageEl.parentNode) {
                        messageEl.parentNode.removeChild(messageEl);
                    }
                }, 300);
            }

            clearMessages() {
                this.messageContainer.innerHTML = '';
            }

            resetForm() {
                this.form.reset();
                this.updateCharacterCount();
                this.clearSavedData();
            }

            autoSave() {
                const data = {
                    question: this.questionInput.value,
                    answer: this.answerTextarea.value,
                    timestamp: new Date().toISOString()
                };
                
                // Store in memory (since localStorage is not available)
                this.savedData = data;
            }

            loadSavedData() {
                // In a real application, you would load from localStorage or API
                // For now, we'll just initialize empty
                this.savedData = null;
            }

            clearSavedData() {
                this.savedData = null;
            }

            // Simulate API call
            submitData() {
                const data = {
                    question: this.questionInput.value,
                    answer: this.answerTextarea.value
                };

                return fetch('/add_qa', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (!response.ok) throw new Error('API error');
                    return response.json();
                })
                .then(json => {
                    if (!json.success) throw new Error(json.message);
                    return json.message;
                });
            }

        }

        // Initialize the admin panel when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new AdminPanel();
        });