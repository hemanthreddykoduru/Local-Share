with open("app/page.tsx", "r") as f:
    text = f.read()

# Add import if missing
if "import RazorpayButton" not in text:
    text = text.replace("import ProfileModal from '@/components/ProfileModal';", "import ProfileModal from '@/components/ProfileModal';\nimport RazorpayButton from '@/components/RazorpayButton';")

# 2. Replace the explicit Smartlink chunk
import re
text = re.sub(r'<a\s+href="https://tightslybella\.com[^>]*?>[\s\S]*?♥️ Support Local Share\s+</a>', '<RazorpayButton />', text)

with open("app/page.tsx", "w") as f:
    f.write(text)
print("done")
