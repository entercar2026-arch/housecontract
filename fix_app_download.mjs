import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldFunc = `  const handleDownloadImage = async () => {
    const element = document.getElementById('printable-area');
    if (!element) return;
    
    // Create a wrapper for proper rendering
    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.style.background = '#fff';
    wrapper.style.width = '100%';
    
    const clone = element.cloneNode(true) as HTMLElement;
    // Remove print-only styles that might mess up canvas rendering
    clone.style.margin = '0';
    clone.style.transform = 'none';
    
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const link = document.createElement('a');
      link.download = activeTab === 'invoice' ? 'invoice.png' : 'contract.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      document.body.removeChild(wrapper);
    }
  };`;

const newFunc = `  const handleDownloadImage = async () => {
    const container = document.getElementById('printable-area');
    // Grab the actual receipt element (first child) instead of the flex container
    const element = container?.firstElementChild as HTMLElement;
    if (!element) return;
    
    // Create a wrapper for proper rendering
    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-99999px';
    wrapper.style.top = '0';
    wrapper.style.background = '#fff';
    wrapper.style.padding = '20px';
    wrapper.style.width = 'max-content';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';
    
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.margin = '0';
    clone.style.transform = 'none';
    
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    // Wait a brief moment for images to load in the clone
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
        backgroundColor: '#ffffff'
      });
      
      const link = document.createElement('a');
      link.download = activeTab === 'invoice' ? 'invoice.png' : 'contract.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
      alert('Failed to save image.');
    } finally {
      document.body.removeChild(wrapper);
    }
  };`;

content = content.replace(oldFunc, newFunc);
fs.writeFileSync('src/App.tsx', content);
