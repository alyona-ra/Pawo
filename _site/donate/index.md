---
eleventyNavigation:
  key: Donate
  parent: main
layout: base
---

<div class="donate-text-wrapper">
  <h1>Donate</h1>
  <p>Donate to Pawo means support those who can't do it themselves.</p>
</div>

<div class="donate-wrapper">
  <h2 class="header">Here you can donate to support the furry!</h2>
  <p class="input-title">Card number</p>
  <input type="text" placeholder="1234 5678 9000 0000" class="card">
  <p class="input-title">Cardholder name</p>
  <input type="text" placeholder="JOHN SMITH" class="all-caps">
  <p class="input-title">Donation amount</p>
  <input type="text" value="$" class="amount">
  <p class="input-title">Want to include a message?</p>
  <textarea></textarea>
  <a href="/thanks">
    <button>DONATE</button>
  </a>
</div>
<script src="/js/donate.js"></script>