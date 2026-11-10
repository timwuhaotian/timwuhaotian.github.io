// Applies the saved theme before first paint (a blocking external script, so the CSP needs no inline allowance).
try { const theme = localStorage.getItem('theme'); if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme } catch {}
