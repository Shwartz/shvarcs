<div class="wrapNews">
    <div>
        <slot/>
    </div>
</div>

<style lang='scss'>
  .wrapNews {
    display: grid;
    grid-template-columns: 1fr min(45rem, 90%) 1fr;

    > div {
      grid-column: 2;
    }
  }
</style>
