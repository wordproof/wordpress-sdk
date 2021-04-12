<link rel="stylesheet" href="<?php echo plugin_dir_url(__FILE__); ?>/styles/wordpress-sdk.css">

<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>

<script type="text/javascript">
    window.WordproofSDK = {
        endpoint: function () { return "<?php echo $endpoint ?? ""; ?>" },
    };
</script>