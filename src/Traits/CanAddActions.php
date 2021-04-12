<?php


namespace WordProof\Wordpress\Traits;


trait CanAddActions
{
    public function add_action($action, $handler, $priority = 10, $accepted_args = 1)
    {
        $closure = function () use ($handler) {
            if (method_exists($this, $handler)) {
                $this->$handler();
            }
        };
        
        $closure->bindTo($this);
        
        add_action($action, $closure, $priority, $accepted_args);
    }
}