function copyCode() {
  const code = document.getElementById("code")
  code.select()
  document.execCommand("copy")
  alert("✅ Code Copied!")
}
