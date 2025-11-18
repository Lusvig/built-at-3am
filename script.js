class DoomscrollDetox {
    constructor() {
        this.SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
        this.RICKROLL_BASE_DURATION = 10 * 60 * 1000; // 10 minutes base
        this.VISIT_LIMIT = 3; // 3 visits in 24h triggers rickroll
        this.STORAGE_KEY_VISITS = 'doomscroll_visits';
        this.STORAGE_KEY_SESSION_START = 'doomscroll_session_start';
        this.STORAGE_KEY_RICKROLL_ACTIVE = 'doomscroll_rickroll_active';
        this.STORAGE_KEY_RICKROLL_END = 'doomscroll_rickroll_end';
        this.STORAGE_KEY_RICKROLL_REFRESH_COUNT = 'doomscroll_rickroll_refreshes';
        
        this.sessionStartTime = null;
        this.sessionTimer = null;
        this.rickrollTimer = null;
        this.rickrollActive = false;
        this.rickrollEndTime = null;
        
        this.elements = {
            sessionTime: document.getElementById('session-time'),
            status: document.getElementById('status'),
            visitCount: document.getElementById('visit-count'),
            harmLevel: document.getElementById('harm-level'),
            lastVisit: document.getElementById('last-visit'),
            refreshBtn: document.getElementById('refresh-btn'),
            clearBtn: document.getElementById('clear-btn'),
            rickrollContainer: document.getElementById('rickroll-container'),
            rickrollTimer: document.getElementById('rickroll-timer'),
            rickrollRemaining: document.getElementById('rickroll-remaining'),
            rickrollClose: document.getElementById('rickroll-close'),
            rickrollAudio: document.getElementById('rickroll-audio'),
            mainContainer: document.getElementById('main-container'),
        };
        
        this.init();
    }

    init() {
        this.recordVisit();
        this.startSession();
        this.attachEventListeners();
        this.updateUI();
        
        // Check if we should activate rickroll mode
        if (this.shouldActivateRickroll()) {
            this.activateRickroll();
        } else if (this.isRickrollActive()) {
            this.restoreRickroll();
        }
    }

    recordVisit() {
        const visits = this.getVisits();
        const now = Date.now();
        visits.push(now);
        this.saveVisits(visits);
    }

    getVisits() {
        const data = localStorage.getItem(this.STORAGE_KEY_VISITS);
        if (!data) return [];
        
        const visits = JSON.parse(data);
        const now = Date.now();
        const oneDayAgo = now - (24 * 60 * 60 * 1000);
        
        // Filter out visits older than 24 hours
        return visits.filter(visit => visit > oneDayAgo);
    }

    saveVisits(visits) {
        localStorage.setItem(this.STORAGE_KEY_VISITS, JSON.stringify(visits));
    }

    shouldActivateRickroll() {
        const visits = this.getVisits();
        return visits.length >= this.VISIT_LIMIT;
    }

    isRickrollActive() {
        const active = localStorage.getItem(this.STORAGE_KEY_RICKROLL_ACTIVE);
        if (!active) return false;
        
        const endTime = parseInt(localStorage.getItem(this.STORAGE_KEY_RICKROLL_END));
        return Date.now() < endTime;
    }

    activateRickroll() {
        this.rickrollActive = true;
        
        // Calculate rickroll duration based on refreshes
        let refreshCount = parseInt(localStorage.getItem(this.STORAGE_KEY_RICKROLL_REFRESH_COUNT) || '0');
        const additionalTime = refreshCount * 60 * 1000; // +1 minute per refresh
        const totalDuration = this.RICKROLL_BASE_DURATION + additionalTime;
        
        this.rickrollEndTime = Date.now() + totalDuration;
        
        localStorage.setItem(this.STORAGE_KEY_RICKROLL_ACTIVE, 'true');
        localStorage.setItem(this.STORAGE_KEY_RICKROLL_END, this.rickrollEndTime.toString());
        
        this.showRickroll();
        this.startRickrollTimer();
    }

    restoreRickroll() {
        this.rickrollActive = true;
        this.rickrollEndTime = parseInt(localStorage.getItem(this.STORAGE_KEY_RICKROLL_END));
        this.showRickroll();
        this.startRickrollTimer();
    }

    showRickroll() {
        this.elements.mainContainer.classList.add('hidden');
        this.elements.rickrollContainer.classList.remove('hidden');
        
        // Force volume to max and autoplay
        this.playRickrollAudio();
        document.body.style.overflow = 'hidden';
        
        // Disable scroll
        document.addEventListener('wheel', this.preventScroll, { passive: false });
        document.addEventListener('touchmove', this.preventScroll, { passive: false });
    }

    playRickrollAudio() {
        // Use embedded rickroll audio via API
        const audio = new Audio();
        audio.src = 'https://www.myinstants.com/media/sounds/rickroll.mp3';
        audio.volume = 1.0;
        audio.loop = true;
        
        try {
            audio.play().catch(() => {
                // If direct play fails, try with user interaction
                document.addEventListener('click', () => {
                    audio.play();
                }, { once: true });
            });
        } catch (e) {
            // Fallback: loop a video with sound
        }
    }

    preventScroll = (e) => {
        if (this.rickrollActive) {
            e.preventDefault();
        }
    }

    hideRickroll() {
        this.elements.rickrollContainer.classList.add('hidden');
        this.elements.mainContainer.classList.remove('hidden');
        document.body.style.overflow = 'auto';
        document.removeEventListener('wheel', this.preventScroll);
        document.removeEventListener('touchmove', this.preventScroll);
        this.rickrollActive = false;
    }

    startRickrollTimer() {
        if (this.rickrollTimer) clearInterval(this.rickrollTimer);
        
        this.rickrollTimer = setInterval(() => {
            const now = Date.now();
            const remaining = this.rickrollEndTime - now;
            
            if (remaining <= 0) {
                clearInterval(this.rickrollTimer);
                this.endRickroll();
                return;
            }
            
            this.updateRickrollDisplay(remaining);
        }, 100);
    }

    updateRickrollDisplay(remaining) {
        const minutes = Math.floor(remaining / (60 * 1000));
        const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
        this.elements.rickrollRemaining.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    endRickroll() {
        localStorage.removeItem(this.STORAGE_KEY_RICKROLL_ACTIVE);
        localStorage.removeItem(this.STORAGE_KEY_RICKROLL_END);
        localStorage.removeItem(this.STORAGE_KEY_RICKROLL_REFRESH_COUNT);
        this.hideRickroll();
        this.elements.rickrollClose.classList.remove('disabled');
        this.elements.rickrollClose.disabled = false;
    }

    startSession() {
        const now = Date.now();
        this.sessionStartTime = now;
        localStorage.setItem(this.STORAGE_KEY_SESSION_START, now.toString());
        
        // Update session timer every 100ms
        if (this.sessionTimer) clearInterval(this.sessionTimer);
        this.sessionTimer = setInterval(() => this.updateSessionTimer(), 100);
    }

    updateSessionTimer() {
        const now = Date.now();
        const elapsed = now - this.sessionStartTime;
        const remaining = Math.max(0, this.SESSION_DURATION - elapsed);
        
        if (remaining <= 0) {
            clearInterval(this.sessionTimer);
            this.endSession();
            return;
        }
        
        this.updateSessionDisplay(remaining);
    }

    updateSessionDisplay(remaining) {
        const minutes = Math.floor(remaining / (60 * 1000));
        const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
        this.elements.sessionTime.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // Update class based on time remaining
        if (remaining <= 60 * 1000) {
            // Critical: less than 1 minute
            this.elements.sessionTime.classList.remove('warning');
            this.elements.sessionTime.classList.add('critical');
        } else if (remaining <= 5 * 60 * 1000) {
            // Warning: less than 5 minutes
            this.elements.sessionTime.classList.remove('critical');
            this.elements.sessionTime.classList.add('warning');
        } else {
            this.elements.sessionTime.classList.remove('warning', 'critical');
        }
    }

    endSession() {
        this.elements.status.textContent = 'YEETED';
        this.elements.status.style.color = '#ff0000';
        this.elements.sessionTime.textContent = '00:00';
        this.elements.sessionTime.classList.add('critical');
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'about:blank';
        }, 2000);
    }

    updateUI() {
        const visits = this.getVisits();
        this.elements.visitCount.textContent = visits.length;
        
        // Update harm level based on visits
        const harmLevels = ['📊', '📈', '📉', '🔴', '💀'];
        const harmIndex = Math.min(visits.length - 1, harmLevels.length - 1);
        this.elements.harmLevel.textContent = harmIndex >= 0 ? harmLevels[harmIndex] : harmLevels[0];
        
        // Update last visit
        if (visits.length > 0) {
            const lastVisitTime = new Date(visits[visits.length - 1]);
            this.elements.lastVisit.textContent = this.formatTime(lastVisitTime);
        }
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }

    attachEventListeners() {
        this.elements.refreshBtn.addEventListener('click', () => this.handleRefresh());
        this.elements.clearBtn.addEventListener('click', () => this.handleClear());
        this.elements.rickrollClose.addEventListener('click', () => this.handleRickrollClose());
        
        // Prevent rickroll close during rickroll
        if (this.rickrollActive && this.rickrollEndTime - Date.now() > 0) {
            this.elements.rickrollClose.classList.add('disabled');
            this.elements.rickrollClose.disabled = true;
        }
    }

    handleRefresh() {
        // Increment refresh counter if rickroll is active
        if (this.rickrollActive || this.isRickrollActive()) {
            let refreshCount = parseInt(localStorage.getItem(this.STORAGE_KEY_RICKROLL_REFRESH_COUNT) || '0');
            refreshCount++;
            localStorage.setItem(this.STORAGE_KEY_RICKROLL_REFRESH_COUNT, refreshCount.toString());
            
            // Add 1 minute to rickroll
            const additionalTime = 60 * 1000;
            this.rickrollEndTime += additionalTime;
            localStorage.setItem(this.STORAGE_KEY_RICKROLL_END, this.rickrollEndTime.toString());
        }
        
        location.reload();
    }

    handleClear() {
        if (confirm('NUKE ALL 24H DATA? THIS CANNOT BE UNDONE.')) {
            localStorage.removeItem(this.STORAGE_KEY_VISITS);
            localStorage.removeItem(this.STORAGE_KEY_RICKROLL_ACTIVE);
            localStorage.removeItem(this.STORAGE_KEY_RICKROLL_END);
            localStorage.removeItem(this.STORAGE_KEY_RICKROLL_REFRESH_COUNT);
            location.reload();
        }
    }

    handleRickrollClose() {
        // Can only close if rickroll time has passed
        if (!this.rickrollActive && (Date.now() >= this.rickrollEndTime)) {
            this.endRickroll();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DoomscrollDetox();
});
